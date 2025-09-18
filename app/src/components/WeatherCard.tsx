import React from 'react';
import { View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { CurrentWeather } from '../services/weather';

type Props = {
  weather: CurrentWeather | null;
};

export default function WeatherCard({ weather }: Props) {
  if (!weather) {
    return (
      <View className="p-4 rounded-2xl bg-white/80 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
        <Text className="text-neutral-500">Đang tải thời tiết...</Text>
      </View>
    );
  }
  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
  return (
    <LinearGradient
      colors={["#60a5fa", "#93c5fd"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ borderRadius: 20 }}
    >
      <View className="p-5 rounded-2xl bg-transparent flex-row items-center">
        <Image source={{ uri: iconUrl }} style={{ width: 90, height: 90 }} accessibilityLabel={weather.description} />
        <View className="ml-4 flex-1">
          <View className="flex-row items-end">
            <Text className="text-6xl font-extrabold text-white leading-none">{Math.round(weather.tempC)}</Text>
            <Text className="text-2xl font-semibold text-white/90 ml-2">°C</Text>
          </View>
          <View className="flex-row items-center mt-2">
            <MaterialCommunityIcons name="map-marker" size={18} color="rgba(255,255,255,0.9)" />
            <Text className="text-white/90 ml-2 font-medium">{weather.name}</Text>
          </View>
          <Text className="text-white/90 mt-1 capitalize">{weather.description}</Text>
        </View>
      </View>
    </LinearGradient>
  );
}


