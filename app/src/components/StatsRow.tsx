import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Stat = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  value: string;
};

type Props = {
  stats: Stat[];
};

export default function StatsRow({ stats }: Props) {
  return (
    <View className="mt-5 flex-row flex-wrap justify-between" style={{ gap: 12 }}>
      {stats.map((s) => (
        <View key={s.label} className="px-4 py-3 rounded-xl bg-white/90 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex-row items-center shadow-sm" style={{ minWidth: 150 }}>
          <MaterialCommunityIcons name={s.icon} size={20} color="#0f172a" />
          <View className="ml-3">
            <Text className="text-neutral-900 dark:text-neutral-50 font-bold">{s.value}</Text>
            <Text className="text-neutral-500 dark:text-neutral-400 text-xs">{s.label}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}



