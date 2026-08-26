import Svg, { Circle, Path, Rect, Line, G, Text as SvgText, Ellipse } from 'react-native-svg';
import { View } from 'react-native';

/**
 * Clothing Hanger SVG Icon
 */
export function HangerGraphic({ size = 100, color = '#6366F1' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* Hanger hook */}
      <Path
        d="M 50 10 Q 40 10 40 20 L 40 30"
        stroke={color}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <Path
        d="M 50 10 Q 60 10 60 20 L 60 30"
        stroke={color}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      {/* Hanger bar */}
      <Line x1="30" y1="30" x2="70" y2="30" stroke={color} strokeWidth="3" strokeLinecap="round" />
      {/* Clothing item */}
      <Path
        d="M 35 35 L 40 60 Q 40 70 50 70 Q 60 70 60 60 L 65 35"
        stroke={color}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Sleeve details */}
      <Line x1="35" y1="40" x2="25" y2="50" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <Line x1="65" y1="40" x2="75" y2="50" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    </Svg>
  );
}

/**
 * Outfit Suggestion SVG Icon
 */
export function OutfitGraphic({ size = 100, color = '#EC4899' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* Top */}
      <Rect x="30" y="15" width="40" height="25" rx="5" fill={color} opacity="0.8" />
      {/* Sleeves */}
      <Rect x="15" y="20" width="15" height="20" rx="3" fill={color} opacity="0.6" />
      <Rect x="70" y="20" width="15" height="20" rx="3" fill={color} opacity="0.6" />
      {/* Bottom */}
      <Rect x="25" y="45" width="50" height="35" rx="5" fill={color} opacity="0.7" />
      {/* Shoes */}
      <Ellipse cx="35" cy="85" rx="8" ry="5" fill={color} opacity="0.9" />
      <Ellipse cx="65" cy="85" rx="8" ry="5" fill={color} opacity="0.9" />
      {/* Sparkle effect */}
      <Circle cx="75" cy="25" r="3" fill="#FBBF24" />
      <Circle cx="20" cy="35" r="2" fill="#FBBF24" />
    </Svg>
  );
}

/**
 * AI Magic SVG Icon
 */
export function AIMagicGraphic({ size = 100, color = '#F59E0B' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* Wand handle */}
      <Rect x="45" y="50" width="10" height="40" rx="5" fill={color} opacity="0.7" />
      {/* Wand tip */}
      <Circle cx="50" cy="45" r="8" fill={color} />
      {/* Sparkles around wand */}
      <G opacity="0.8">
        {/* Top sparkle */}
        <Line x1="50" y1="15" x2="50" y2="25" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <Line x1="45" y1="20" x2="55" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
        {/* Left sparkle */}
        <Line x1="20" y1="35" x2="28" y2="35" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <Line x1="24" y1="31" x2="24" y2="39" stroke={color} strokeWidth="2" strokeLinecap="round" />
        {/* Right sparkle */}
        <Line x1="72" y1="40" x2="80" y2="40" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <Line x1="76" y1="36" x2="76" y2="44" stroke={color} strokeWidth="2" strokeLinecap="round" />
        {/* Bottom sparkle */}
        <Line x1="55" y1="70" x2="65" y2="70" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <Line x1="60" y1="65" x2="60" y2="75" stroke={color} strokeWidth="2" strokeLinecap="round" />
      </G>
    </Svg>
  );
}

/**
 * Camera Capture SVG Icon
 */
export function CameraGraphic({ size = 100, color = '#3B82F6' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* Camera body */}
      <Rect x="15" y="25" width="70" height="55" rx="8" fill="none" stroke={color} strokeWidth="2.5" />
      {/* Lens */}
      <Circle cx="50" cy="52" r="18" fill="none" stroke={color} strokeWidth="2.5" />
      <Circle cx="50" cy="52" r="12" fill={color} opacity="0.2" />
      {/* Flash */}
      <Rect x="25" y="30" width="12" height="12" rx="2" fill="none" stroke={color} strokeWidth="2" />
      {/* Viewfinder lines */}
      <Line x1="35" y1="40" x2="65" y2="40" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <Line x1="35" y1="64" x2="65" y2="64" stroke={color} strokeWidth="1.5" opacity="0.5" />
    </Svg>
  );
}

/**
 * Heart/Favorites SVG Icon
 */
export function HeartGraphic({ size = 100, color = '#EC4899' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Path
        d="M 50 85 C 25 70 10 55 10 40 C 10 25 20 15 30 15 C 40 15 50 25 50 25 C 50 25 60 15 70 15 C 80 15 90 25 90 40 C 90 55 75 70 50 85 Z"
        fill={color}
        opacity="0.8"
      />
      {/* Shine effect */}
      <Circle cx="40" cy="35" r="5" fill="white" opacity="0.4" />
    </Svg>
  );
}

/**
 * Stats/Analytics SVG Icon
 */
export function StatsGraphic({ size = 100, color = '#10B981' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* Bars */}
      <Rect x="20" y="60" width="12" height="30" rx="2" fill={color} opacity="0.6" />
      <Rect x="40" y="40" width="12" height="50" rx="2" fill={color} opacity="0.8" />
      <Rect x="60" y="20" width="12" height="70" rx="2" fill={color} opacity="0.7" />
      {/* Baseline */}
      <Line x1="15" y1="92" x2="80" y2="92" stroke={color} strokeWidth="2" opacity="0.5" />
      {/* Trend line */}
      <Path
        d="M 20 75 L 40 55 L 60 35 L 80 20"
        stroke={color}
        strokeWidth="2"
        fill="none"
        opacity="0.6"
        strokeLinecap="round"
      />
    </Svg>
  );
}
