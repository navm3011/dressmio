import { ScrollView, View, Text, Pressable, Modal, Alert } from 'react-native';
import { useState, useCallback } from 'react';
import { ClothingItem } from '@/lib/types';
import { IconSymbol } from './ui/icon-symbol';
import { useColors } from '@/hooks/use-colors';
import { hapticFeedback } from '@/lib/haptics';
import { Image } from 'expo-image';

interface ItemDetailModalProps {
  item: ClothingItem | null;
  visible: boolean;
  onClose: () => void;
  onDelete?: (itemId: string) => Promise<void>;
  onUpdate?: (item: ClothingItem) => Promise<void>;
}

export function ItemDetailModal({
  item,
  visible,
  onClose,
  onDelete,
  onUpdate,
}: ItemDetailModalProps) {
  const colors = useColors();
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = useCallback(async () => {
    if (!item) return;
    
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', onPress: () => {} },
        {
          text: 'Delete',
          onPress: async () => {
            await hapticFeedback.warning();
            try {
              await onDelete?.(item.id);
              await hapticFeedback.success();
              onClose();
            } catch (error) {
              console.error('Failed to delete item:', error);
              await hapticFeedback.error();
              Alert.alert('Error', 'Failed to delete item');
            }
          },
          style: 'destructive',
        },
      ]
    );
  }, [item, onDelete, onClose]);

  if (!item) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      presentationStyle="pageSheet"
    >
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-4 border-b border-border">
          <Pressable onPress={onClose} style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}>
            <IconSymbol name="chevron.left" size={24} color={colors.primary} />
          </Pressable>
          <Text className="text-lg font-bold text-foreground">Item Details</Text>
          <Pressable
            onPress={() => setIsEditing(!isEditing)}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          >
            <IconSymbol name={isEditing ? 'checkmark' : 'pencil'} size={24} color={colors.primary} />
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16, gap: 16 }}>
          {/* Image */}
          {item.imageUri && (
            <View className="rounded-lg overflow-hidden bg-surface">
              <Image
                source={{ uri: item.imageUri }}
                style={{ width: '100%', height: 300 }}
                contentFit="cover"
              />
            </View>
          )}

          {/* AI Analysis Section */}
          {item.aiDetected && item.aiMetadata && (
            <View className="gap-3">
              <Text className="text-sm font-semibold text-foreground">AI Analysis</Text>
              <View className="bg-primary bg-opacity-10 border border-primary rounded-lg p-4 gap-2">
                <View className="flex-row justify-between items-center">
                  <Text className="text-xs text-muted">Confidence Score</Text>
                  <View className="flex-row items-center gap-2">
                    <View
                      style={{
                        width: 60,
                        height: 6,
                        backgroundColor: colors.border,
                        borderRadius: 3,
                        overflow: 'hidden',
                      }}
                    >
                      <View
                        style={{
                          width: `${(item.aiMetadata.confidence || 0) * 100}%`,
                          height: '100%',
                          backgroundColor: colors.primary,
                        }}
                      />
                    </View>
                    <Text className="text-xs font-semibold text-primary">
                      {((item.aiMetadata.confidence || 0) * 100).toFixed(0)}%
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* Item Details Section */}
          <View className="gap-3">
            <Text className="text-sm font-semibold text-foreground">Item Information</Text>
            <View className="bg-surface border border-border rounded-lg p-4 gap-3">
              <DetailRow label="Category" value={item.category} />
              <DetailRow label="Type" value={item.specificType} />
              <DetailRow label="Color" value={item.color} />
              {item.material && <DetailRow label="Material" value={item.material} />}
              {item.pattern && <DetailRow label="Pattern" value={item.pattern} />}
              {item.fit && <DetailRow label="Fit" value={item.fit} />}
              {item.style && <DetailRow label="Style" value={item.style} />}
              {item.size && <DetailRow label="Size" value={item.size} />}
              <DetailRow label="Season" value={item.season} />
              <DetailRow
                label="Occasions"
                value={Array.isArray(item.occasion) ? item.occasion.join(', ') : item.occasion}
              />
              {item.condition && <DetailRow label="Condition" value={item.condition} />}
            </View>
          </View>

          {/* Notes Section */}
          {item.tags && item.tags.length > 0 && (
            <View className="gap-3">
              <Text className="text-sm font-semibold text-foreground">Notes</Text>
              <View className="bg-surface border border-border rounded-lg p-4">
                <Text className="text-sm text-foreground">{item.tags.join(', ')}</Text>
              </View>
            </View>
          )}

          {/* Delete Button */}
          <Pressable
            onPress={handleDelete}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          >
            <View className="bg-error rounded-lg py-3 items-center">
              <Text className="text-white font-semibold">Delete Item</Text>
            </View>
          </Pressable>

          {/* Spacer */}
          <View style={{ height: 20 }} />
        </ScrollView>
      </View>
    </Modal>
  );
}

interface DetailRowProps {
  label: string;
  value: string;
}

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <View className="flex-row justify-between items-center py-2 border-b border-border/50">
      <Text className="text-xs text-muted">{label}</Text>
      <Text className="text-sm font-semibold text-foreground capitalize">{value}</Text>
    </View>
  );
}
