import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { Card } from 'react-native-elements';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import type { ForecastItem } from '../services/weather';

const { width } = Dimensions.get('window');

type Props = {
  items: ForecastItem[];
};

const getTimeColor = (hour: number) => {
  if (hour >= 6 && hour < 12) return ['#ffeaa7', '#fab1a0']; // Morning
  if (hour >= 12 && hour < 18) return ['#74b9ff', '#0984e3']; // Afternoon
  if (hour >= 18 && hour < 22) return ['#fd79a8', '#e84393']; // Evening
  return ['#636e72', '#2d3436']; // Night
};

const ForecastCard = ({ item, index }: { item: ForecastItem; index: number }) => {
  const date = new Date(item.dt * 1000);
  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  const iconUrl = `https://openweathermap.org/img/wn/${item.icon}@2x.png`;
  const timeColors = getTimeColor(date.getHours());
  
  return (
    <Animatable.View 
      animation="fadeInUp" 
      delay={index * 100}
      duration={600}
      style={{ width: (width - 60) / 2, marginBottom: 15 }}
    >
      <Card containerStyle={{
        borderRadius: 20,
        elevation: 6,
        borderWidth: 0,
        padding: 0,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        margin: 0,
      }}>
        <LinearGradient
          colors={timeColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ borderRadius: 20 }}
        >
          <BlurView intensity={15} tint="light" style={{ borderRadius: 20 }}>
            <View style={{ padding: 15, alignItems: 'center', minHeight: 120 }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: '600', opacity: 0.9 }}>
                {hh}:{mm}
              </Text>
              <Image 
                source={{ uri: iconUrl }} 
                style={{ width: 50, height: 50, marginVertical: 8 }}
              />
              <Text style={{ color: 'white', fontSize: 18, fontWeight: '700' }}>
                {Math.round(item.tempC)}°C
              </Text>
              <Text style={{ 
                color: 'white', 
                fontSize: 11, 
                opacity: 0.8, 
                textAlign: 'center',
                marginTop: 4,
                textTransform: 'capitalize'
              }}>
                {item.description}
              </Text>
            </View>
          </BlurView>
        </LinearGradient>
      </Card>
    </Animatable.View>
  );
};

export default function ForecastGrid({ items }: Props) {
  return (
    <View style={{ marginTop: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15, paddingHorizontal: 5 }}>
        <MaterialCommunityIcons name="clock-outline" size={24} color="white" />
        <Text style={{ fontSize: 20, fontWeight: '700', color: 'white', marginLeft: 10 }}>
          Dự báo theo giờ
        </Text>
      </View>
      
      <View style={{ 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'space-between',
        paddingHorizontal: 5 
      }}>
        {items.map((item, index) => (
          <ForecastCard key={item.dt} item={item} index={index} />
        ))}
      </View>
    </View>
  );
}
