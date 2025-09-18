import React from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import type { ForecastItem } from '../services/weather';

type Props = {
  items: ForecastItem[];
};

export default function ForecastList({ items }: Props) {
  return (
    <View className="mt-4">
      <FlatList
        data={items}
        keyExtractor={(item) => String(item.dt)}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12 }}
        renderItem={({ item }) => {
          const iconUrl = `https://openweathermap.org/img/wn/${item.icon}.png`;
          const date = new Date(item.dt * 1000);
          const hh = String(date.getHours()).padStart(2, '0');
          const mm = String(date.getMinutes()).padStart(2, '0');
          return (
            <LinearGradient
              colors={["#e0f2fe", "#f0f9ff"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ borderRadius: 12 }}
            >
              <View className="px-4 py-3 rounded-xl bg-transparent items-center w-24">
                <Text className="text-neutral-600 dark:text-neutral-300 mb-1 text-sm">{hh}:{mm}</Text>
                <Image source={{ uri: iconUrl }} style={{ width: 44, height: 44 }} />
                <Text className="text-neutral-900 dark:text-white mt-1 font-semibold">{Math.round(item.tempC)}°</Text>
              </View>
            </LinearGradient>
          );
        }}
      />
    </View>
  );
}


