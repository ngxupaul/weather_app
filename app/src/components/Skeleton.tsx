import React from 'react';
import { View } from 'react-native';

export function SkeletonBox({ className }: { className?: string }) {
  return <View className={`bg-neutral-200/60 dark:bg-neutral-700/50 rounded-lg ${className ?? ''}`} />;
}



