import React from 'react';
import { View, Text, ImageBackground, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { Card, Avatar } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import type { CurrentWeather } from '../services/weather';

const { width } = Dimensions.get('window');

type Props = {
  weather: CurrentWeather | null;
};

const getGradientColors = (temp: number) => {
  if (temp < 0) return ['#667eea', '#764ba2']; // Cold purple
  if (temp < 15) return ['#4facfe', '#00f2fe']; // Cool blue
  if (temp < 25) return ['#43e97b', '#38f9d7']; // Mild green
  if (temp < 35) return ['#fa709a', '#fee140']; // Warm orange
  return ['#ff6b6b', '#ee5a24']; // Hot red
};

export default function PremiumWeatherCard({ weather }: Props) {
  if (!weather) {
    return (
      <Animatable.View animation="pulse" iterationCount="infinite">
        <Card containerStyle={{ borderRadius: 20, elevation: 8, borderWidth: 0 }}>
          <View style={{ height: 200, justifyContent: 'center', alignItems: 'center' }}>
            <MaterialCommunityIcons name="loading" size={40} color="#bbb" />
            <Text style={{ marginTop: 10, color: '#666' }}>Đang tải...</Text>
          </View>
        </Card>
      </Animatable.View>
    );
  }

  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@4x.png`;
  const gradientColors = getGradientColors(weather.tempC);

  return (
    <Animatable.View animation="fadeInUp" duration={800}>
      <Card containerStyle={{ 
        borderRadius: 25, 
        elevation: 12, 
        borderWidth: 0, 
        padding: 0,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
      }}>
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ borderRadius: 25 }}
        >
          <BlurView intensity={20} tint="light" style={{ borderRadius: 25 }}>
            <View style={{ padding: 25, minHeight: 220 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: 'white', fontSize: 18, fontWeight: '600', opacity: 0.9 }}>
                    {weather.name}
                  </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 10 }}>
                    <Text style={{ color: 'white', fontSize: 64, fontWeight: '300', lineHeight: 70 }}>
                      {Math.round(weather.tempC)}
                    </Text>
                    <Text style={{ color: 'white', fontSize: 24, fontWeight: '400', opacity: 0.8 }}>°C</Text>
                  </View>
                  <Text style={{ color: 'white', fontSize: 16, opacity: 0.8, marginTop: 5, textTransform: 'capitalize' }}>
                    {weather.description}
                  </Text>
                </View>
                <Avatar
                  source={{ uri: iconUrl }}
                  size={100}
                  containerStyle={{ backgroundColor: 'transparent' }}
                />
              </View>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 25, paddingTop: 20, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.2)' }}>
                <View style={{ alignItems: 'center' }}>
                  <MaterialCommunityIcons name="thermometer" size={20} color="white" />
                  <Text style={{ color: 'white', fontSize: 14, marginTop: 5, opacity: 0.8 }}>Cảm giác</Text>
                  <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>{Math.round(weather.feelsLikeC)}°</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <MaterialCommunityIcons name="water-percent" size={20} color="white" />
                  <Text style={{ color: 'white', fontSize: 14, marginTop: 5, opacity: 0.8 }}>Độ ẩm</Text>
                  <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>{weather.humidity}%</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <MaterialCommunityIcons name="weather-windy" size={20} color="white" />
                  <Text style={{ color: 'white', fontSize: 14, marginTop: 5, opacity: 0.8 }}>Gió</Text>
                  <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>{Math.round(weather.windMs * 3.6)} km/h</Text>
                </View>
              </View>
            </View>
          </BlurView>
        </LinearGradient>
      </Card>
    </Animatable.View>
  );
}
