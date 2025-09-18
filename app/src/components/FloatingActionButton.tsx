import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import * as Animatable from 'react-native-animatable';

type Props = {
  onPress: () => void;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  loading?: boolean;
};

export default function FloatingActionButton({ onPress, icon, loading }: Props) {
  return (
    <Animatable.View
      animation={loading ? 'rotate' : 'pulse'}
      iterationCount={loading ? 'infinite' : 1}
      duration={loading ? 2000 : 1000}
      style={{
        position: 'absolute',
        bottom: 30,
        right: 30,
        zIndex: 1000,
      }}
    >
      <TouchableOpacity onPress={onPress} disabled={loading}>
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            elevation: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
          }}
        >
          <BlurView intensity={20} tint="light" style={{ 
            width: 60, 
            height: 60, 
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <MaterialCommunityIcons 
              name={loading ? 'loading' : icon} 
              size={24} 
              color="white" 
            />
          </BlurView>
        </LinearGradient>
      </TouchableOpacity>
    </Animatable.View>
  );
}
