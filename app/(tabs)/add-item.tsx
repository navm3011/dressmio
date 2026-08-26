import {
  FlatList,
  View,
  Text,
  Pressable,
  ActivityIndicator,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useCallback } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { ScreenContainer } from '@/components/screen-container';
import { ScreenHeader } from '@/components/screen-header';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColors } from '@/hooks/use-colors';
import { useCloset } from '@/lib/closet-provider';
import { ClothingItem } from '@/lib/types';
import { cn } from '@/lib/utils';
import { trpc } from '@/lib/trpc';
import { hapticFeedback } from '@/lib/haptics';
import { optimizeImageOnCapture } from '@/lib/image-optimization';
import { uploadImageToS3 } from '@/lib/upload-image';
import { useOnboarding } from '@/lib/onboarding-provider';
import { OnboardingTooltip, OnboardingOverlay } from '@/components/onboarding-tooltip';

export default function AddItemScreen() {
  const router = useRouter();
  const colors = useColors();
  const { addItem } = useCloset();
  const { currentStep, showTooltip, setShowTooltip, completeStep } = useOnboarding();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'select' | 'preview' | 'details'>('select');
  const [size, setSize] = useState('');
  const [customNotes, setCustomNotes] = useState('');
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);
  const [productPhotoUrl, setProductPhotoUrl] = useState<string | null>(null);
  const [generatingProductPhoto, setGeneratingProductPhoto] = useState(false);

  const analyzeMutation = trpc.ai.analyzeClothing.useMutation();
  const generateProductPhotoMutation = trpc.ai.generateProductPhoto.useMutation();

  const handleCameraPress = useCallback(async () => {
    await hapticFeedback.tap();
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      alert('Camera permission is required');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.8,
    });

    if (!result.canceled) {
      await hapticFeedback.selection();
      const optimizedUri = await optimizeImageOnCapture(result.assets[0].uri);
      setSelectedImage(optimizedUri);
      setStep('preview');
    }
  }, []);

  const handlePhotoLibraryPress = useCallback(async () => {
    await hapticFeedback.tap();
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert('Photo library permission is required');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.8,
    });

    if (!result.canceled) {
      await hapticFeedback.selection();
      const optimizedUri = await optimizeImageOnCapture(result.assets[0].uri);
      setSelectedImage(optimizedUri);
      setStep('preview');
    }
  }, []);

  const handleConfirmImage = useCallback(async () => {
    await hapticFeedback.tap();
    setAiAnalyzing(true);
    try {
      if (!selectedImage) {
        alert('No image selected');
        setAiAnalyzing(false);
        return;
      }
      
      // Upload image to S3 and get URL for AI analysis
      const imageS3Url = await uploadImageToS3(selectedImage);
      
      // Send to AI service for analysis
      const result = await analyzeMutation.mutateAsync({ imageUrl: imageS3Url });
      if (result.success && result.data) {
        await hapticFeedback.success();
        setAiResult(result.data);
        
        // Generate clean product photo
        setGeneratingProductPhoto(true);
        try {
          const clothingDescription = `${result.data.specificType}, ${result.data.color} ${result.data.material}`;
          const photoResult = await generateProductPhotoMutation.mutateAsync({
            imageUrl: imageS3Url,
            clothingDescription: clothingDescription,
          });
          if (photoResult.success && photoResult.data?.url) {
            setProductPhotoUrl(photoResult.data.url);
            await hapticFeedback.success();
          } else {
            console.warn('Product photo generation failed, using original image');
          }
        } catch (photoError) {
          console.warn('Product photo generation error:', photoError);
        } finally {
          setGeneratingProductPhoto(false);
        }
      } else {
        await hapticFeedback.warning();
        alert('AI analysis failed: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('AI analysis failed:', error);
      await hapticFeedback.warning();
      alert('Failed to analyze image. Please try again.');
    } finally {
      setAiAnalyzing(false);
    }
    setStep('details');
  }, [selectedImage, analyzeMutation, generateProductPhotoMutation]);

  const handleSaveItem = useCallback(async () => {
    if (!selectedImage || !aiResult) return;

    await hapticFeedback.medium();
    try {
      setLoading(true);

      const newItem: ClothingItem = {
        id: Date.now().toString(),
        imageUri: productPhotoUrl || selectedImage,
        category: aiResult.category,
        specificType: aiResult.specificType,
        color: aiResult.color,
        material: aiResult.material,
        style: aiResult.style,
        fit: aiResult.fit,
        pattern: aiResult.pattern,
        size: size || undefined,
        season: aiResult.season,
        occasion: aiResult.occasion,
        tags: customNotes ? [customNotes] : [],
        condition: 'good',
        aiDetected: true,
        aiMetadata: {
          confidence: aiResult.confidence,
          detectedCategory: aiResult.category,
          detectedColor: aiResult.color,
          detectedStyle: aiResult.style,
          detectedMaterial: aiResult.material,
          detectedPattern: aiResult.pattern,
          detectedFit: aiResult.fit,
        },
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      await addItem(newItem);
      await hapticFeedback.success();
      
      // Clear form state
      setSelectedImage(null);
      setAiResult(null);
      setProductPhotoUrl(null);
      setSize('');
      setCustomNotes('');
      setStep('select');
      
      router.back();
    } catch (error) {
      console.error('Failed to save item:', error);
      await hapticFeedback.error();
      alert('Failed to save item');
    } finally {
      setLoading(false);
    }
  }, [selectedImage, aiResult, productPhotoUrl, size, customNotes, addItem, router]);

  const handleBack = useCallback(async () => {
    await hapticFeedback.tap();
    if (step === 'select') {
      router.back();
    } else {
      setStep(step === 'details' ? 'preview' : 'select');
      if (step === 'preview') {
        setSelectedImage(null);
        setAiResult(null);
        setAiAnalyzing(false);
      }
    }
  }, [step, router]);

  if (step === 'select') {
    return (
      <ScreenContainer className="flex-1 bg-background">
        <ScreenHeader 
          infoTitle="Add Item"
          infoMessage="Capture or upload a photo of your clothing item. The app will automatically detect the type and color to help organize your wardrobe."
        />
        <View className="flex-1 items-center justify-center px-4 gap-6">
          <View className="items-center gap-2">
            <IconSymbol name="camera.fill" size={48} color={colors.primary} />
            <Text className="text-2xl font-bold text-foreground">Add Clothing Item</Text>
            <Text className="text-sm text-muted text-center">
              Take a photo or choose from your library. AI will automatically detect the type and details.
            </Text>
          </View>

          <View className="w-full gap-3">
            <Pressable
              onPress={handleCameraPress}
              style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1, transform: [{ scale: pressed ? 0.97 : 1 }] }]}
            >
              <View className="bg-primary rounded-lg py-4 items-center">
                <IconSymbol name="camera.fill" size={24} color="#ffffff" />
                <Text className="text-white font-semibold mt-2">Take Photo</Text>
              </View>
            </Pressable>

            <Pressable
              onPress={handlePhotoLibraryPress}
              style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1, transform: [{ scale: pressed ? 0.97 : 1 }] }]}
            >
              <View className="bg-surface border border-border rounded-lg py-4 items-center">
                <IconSymbol name="photo" size={24} color={colors.primary} />
                <Text className="text-foreground font-semibold mt-2">Choose from Library</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </ScreenContainer>
    );
  }

  if (step === 'preview') {
    return (
      <ScreenContainer className="flex-1 bg-background">
        <ScreenHeader 
          infoTitle="Add Item"
          infoMessage="Capture or upload a photo of your clothing item. The app will automatically detect the type and color to help organize your wardrobe."
        />
        <View className="flex-1">
          <View className="flex-row items-center justify-between px-4 py-4 border-b border-border">
            <Pressable onPress={handleBack} style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}>
              <View style={{ width: 40 }} />
            </Pressable>
            <Text className="text-lg font-bold text-foreground">Preview</Text>
            <View style={{ width: 40 }} />
          </View>

          <View className="flex-1 items-center justify-center px-4">
            {selectedImage && (
              <Image
                source={{ uri: selectedImage }}
                className="w-full h-80 rounded-lg bg-white"
                resizeMode="contain"
              />
            )}
          </View>

          <View className="px-4 py-4 gap-3 border-t border-border">
            <Pressable
              onPress={handleConfirmImage}
              disabled={aiAnalyzing || generatingProductPhoto}
              style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1, transform: [{ scale: pressed ? 0.97 : 1 }] }]}
            >
              <View className="bg-primary rounded-lg py-3 items-center">
                {aiAnalyzing || generatingProductPhoto ? (
                  <>
                    <ActivityIndicator color="#ffffff" />
                    <Text className="text-white font-semibold mt-1 text-xs">
                      {generatingProductPhoto ? 'Cleaning photo...' : 'Analyzing...'}
                    </Text>
                  </>
                ) : (
                  <>
                    <IconSymbol name="sparkles" size={20} color="#ffffff" />
                    <Text className="text-white font-semibold mt-1">Analyze with AI</Text>
                  </>
                )}
              </View>
            </Pressable>

            <Pressable
              onPress={handleBack}
              style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
            >
              <View className="bg-surface border border-border rounded-lg py-3 items-center">
                <Text className="text-foreground font-semibold">Back</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="flex-1 bg-background">
      <ScreenHeader 
        infoTitle="Add Item"
        infoMessage="Capture or upload a photo of your clothing item. The app will automatically detect the type and color to help organize your wardrobe."
      />
      <View className="flex-1">
        <View className="flex-row items-center justify-between px-4 py-4 border-b border-border">
          <Pressable onPress={handleBack} style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}>
            <IconSymbol name="chevron.left" size={24} color={colors.primary} />
          </Pressable>
          <Text className="text-lg font-bold text-foreground">Item Details</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16, gap: 16 }}>
          {(productPhotoUrl || selectedImage) && (
            <View className="px-4 py-4 gap-2">
              <Image
                source={{ uri: (productPhotoUrl || selectedImage) as string }}
                className="w-full h-40 rounded-lg bg-white"
                resizeMode="contain"
              />
              {productPhotoUrl && (
                <View className="bg-success bg-opacity-10 border border-success rounded-lg p-2">
                  <Text className="text-xs text-success font-semibold">✓ Professional photo generated</Text>
                </View>
              )}
            </View>
          )}

          <View className="gap-4">
            {aiResult && (
              <View className="gap-3">
                <View className="bg-primary bg-opacity-10 border border-primary rounded-lg p-3">
                  <Text className="text-xs font-semibold text-primary mb-1">AI Analysis Complete</Text>
                  <Text className="text-xs text-muted">
                    Detected: {aiResult.specificType} • Confidence: {(aiResult.confidence * 100).toFixed(0)}%
                  </Text>
                </View>
              </View>
            )}

            <View>
              <Text className="text-sm font-semibold text-foreground mb-2">Detected Category</Text>
              <View className="bg-surface border border-border rounded-lg p-3">
                <Text className="text-sm text-foreground capitalize font-semibold">
                  {aiResult?.specificType || 'Analyzing...'}
                </Text>
                <Text className="text-xs text-muted mt-1">
                  {aiResult?.category} • Confidence: {aiResult?.confidence ? (aiResult.confidence * 100).toFixed(0) : '0'}%
                </Text>
              </View>
            </View>

            <View>
              <Text className="text-sm font-semibold text-foreground mb-2">Detected Details</Text>
              <View className="bg-surface border border-border rounded-lg p-3 gap-2">
                <View className="flex-row justify-between">
                  <Text className="text-xs text-muted">Color:</Text>
                  <Text className="text-sm text-foreground capitalize font-semibold">{aiResult?.color || 'N/A'}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-xs text-muted">Material:</Text>
                  <Text className="text-sm text-foreground capitalize font-semibold">{aiResult?.material || 'N/A'}</Text>
                </View>
                {aiResult?.pattern && (
                  <View className="flex-row justify-between">
                    <Text className="text-xs text-muted">Pattern:</Text>
                    <Text className="text-sm text-foreground capitalize font-semibold">{aiResult.pattern}</Text>
                  </View>
                )}
                {aiResult?.fit && (
                  <View className="flex-row justify-between">
                    <Text className="text-xs text-muted">Fit:</Text>
                    <Text className="text-sm text-foreground capitalize font-semibold">{aiResult.fit}</Text>
                  </View>
                )}
              </View>
            </View>

            <View>
              <Text className="text-sm font-semibold text-foreground mb-2">Size (Optional)</Text>
              <TextInput
                placeholder="e.g., M, L, 10"
                placeholderTextColor={colors.muted}
                value={size}
                onChangeText={setSize}
                className="bg-surface border border-border rounded-lg px-3 py-2 text-sm text-foreground"
              />
            </View>

            <View>
              <Text className="text-sm font-semibold text-foreground mb-2">Notes (Optional)</Text>
              <TextInput
                placeholder="Add any notes about this item..."
                placeholderTextColor={colors.muted}
                value={customNotes}
                onChangeText={setCustomNotes}
                multiline
                numberOfLines={3}
                className="bg-surface border border-border rounded-lg px-3 py-2 text-sm text-foreground"
              />
            </View>
          </View>
        </ScrollView>

        <View className="px-4 py-4 gap-3 border-t border-border">
          <Pressable
            onPress={handleSaveItem}
            disabled={loading || !aiResult}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1, transform: [{ scale: pressed ? 0.97 : 1 }] }]}
          >
            <View className={cn('rounded-lg py-3 items-center', !aiResult ? 'bg-muted' : 'bg-primary')}>
              {loading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text className="text-white font-semibold">
                  {!aiResult ? 'Analyzing...' : 'Save Item'}
                </Text>
              )}
            </View>
          </Pressable>

          <Pressable
            onPress={handleBack}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          >
            <View className="bg-surface border border-border rounded-lg py-3 items-center">
              <Text className="text-foreground font-semibold">Cancel</Text>
            </View>
          </Pressable>
        </View>
      </View>
      
      {/* Onboarding Tooltip */}
      {currentStep === 'add-item' && showTooltip && (
        <OnboardingOverlay visible={true}>
          <OnboardingTooltip
            title="Add Your First Item"
            description="Take a photo or select an image of a clothing item. Our AI will automatically detect the color, material, pattern, and style!"
            position="center"
            stepNumber={1}
            totalSteps={3}
            onNext={() => completeStep('closet')}
            onSkip={() => completeStep('completed')}
            showSkip={true}
          />
        </OnboardingOverlay>
      )}
    </ScreenContainer>
  );
}
