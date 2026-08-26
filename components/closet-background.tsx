import { View, Image as RNImage } from 'react-native';
import { ReactNode } from 'react';

interface ClosetBackgroundProps {
  children: ReactNode;
  className?: string;
}

// S3 CDN URL for the closet background image
const CLOSET_BACKGROUND_URL = 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663347044519/qDXsDENBxIcMQkKJ.png';

/**
 * Closet Background Component
 * 
 * Displays the closet image as a full-screen background with content overlay.
 * The background image is positioned absolutely and content is layered on top.
 */
export function ClosetBackground({ children, className }: ClosetBackgroundProps) {
  return (
    <View className="flex-1 relative">
      {/* Background Image */}
      <RNImage
        source={{ uri: CLOSET_BACKGROUND_URL }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
        }}
        resizeMode="cover"
      />
      
      {/* Content Overlay with semi-transparent background */}
      <View className={`flex-1 bg-black/30 ${className || ''}`}>
        {children}
      </View>
    </View>
  );
}
