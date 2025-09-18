import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = {
  locationName?: string;
  onRefresh?: () => void;
};

export default function Header({ locationName, onRefresh }: Props) {
  const now = new Date();
  const dateStr = now.toLocaleDateString('vi-VN', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
  });
  return (
    <View className="mb-5 flex-row items-center justify-between">
      <View>
        <Text className="text-3xl font-extrabold text-neutral-900 dark:text-white">Thời tiết</Text>
        <View className="flex-row items-center mt-1">
          <MaterialCommunityIcons name="calendar-today" size={16} color="#334155" />
          <Text className="text-neutral-700 dark:text-neutral-300 ml-2 capitalize">{dateStr}</Text>
        </View>
        {locationName ? (
          <View className="flex-row items-center mt-1">
            <MaterialCommunityIcons name="map-marker-outline" size={16} color="#334155" />
            <Text className="text-neutral-700 dark:text-neutral-300 ml-2 max-w-[220px]" numberOfLines={1} ellipsizeMode="tail">{locationName}</Text>
          </View>
        ) : null}
      </View>
      <View className="flex-row items-center">
        <MaterialCommunityIcons name="weather-partly-cloudy" size={28} color="#1f2937" />
        {onRefresh ? (
          <View className="ml-3 bg-white/90 rounded-full p-2 shadow-sm">
            <MaterialCommunityIcons name="refresh" size={18} color="#0f172a" onPress={onRefresh} />
          </View>
        ) : null}
      </View>
    </View>
  );
}



