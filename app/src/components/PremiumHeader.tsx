import React from 'react';
import { View, Text, StatusBar, Platform } from 'react-native';
import { Card } from 'react-native-elements';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

type Props = {
  locationName?: string;
};

export default function PremiumHeader({ locationName }: Props) {
  const now = new Date();
  const dateStr = now.toLocaleDateString('vi-VN', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  
  const timeStr = now.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Animatable.View animation="fadeInDown" duration={800}>
      <Card containerStyle={{
        borderRadius: 20,
        elevation: 8,
        borderWidth: 0,
        padding: 0,
        overflow: 'hidden',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
      }}>
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ borderRadius: 20 }}
        >
          <BlurView intensity={25} tint="dark" style={{ borderRadius: 20 }}>
            <View style={{ padding: 20, paddingTop: Platform.OS === 'ios' ? 50 : 20 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: 'white', fontSize: 28, fontWeight: '700' }}>
                    Thời tiết
                  </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                    <MaterialCommunityIcons name="calendar-today" size={16} color="white" />
                    <Text style={{ color: 'white', fontSize: 14, opacity: 0.9, marginLeft: 8, textTransform: 'capitalize' }}>
                      {dateStr}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                    <MaterialCommunityIcons name="clock-outline" size={16} color="white" />
                    <Text style={{ color: 'white', fontSize: 14, opacity: 0.9, marginLeft: 8 }}>
                      {timeStr}
                    </Text>
                  </View>
                  {locationName ? (
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                      <MaterialCommunityIcons name="map-marker" size={16} color="white" />
                      <Text style={{ 
                        color: 'white', 
                        fontSize: 14, 
                        opacity: 0.9, 
                        marginLeft: 8,
                        maxWidth: 200
                      }} numberOfLines={1}>
                        {locationName}
                      </Text>
                    </View>
                  ) : null}
                </View>
                <MaterialCommunityIcons name="weather-partly-cloudy" size={40} color="white" />
              </View>
            </View>
          </BlurView>
        </LinearGradient>
      </Card>
    </Animatable.View>
  );
}
