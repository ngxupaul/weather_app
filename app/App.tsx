import { StatusBar } from 'expo-status-bar';
import { View, ScrollView, ImageBackground, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import { useEffect, useState, useCallback } from 'react';
import PremiumWeatherCard from './src/components/PremiumWeatherCard';
import ForecastGrid from './src/components/ForecastGrid';
import PremiumHeader from './src/components/PremiumHeader';
import FloatingActionButton from './src/components/FloatingActionButton';
import { fetchCurrentWeather, fetchShortForecast } from './src/services/weather';
import * as Animatable from 'react-native-animatable';

export default function App() {
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setPermissionError('Cần quyền truy cập vị trí để lấy thời tiết.');
          setLoading(false);
          return;
        }
        const loc = await Location.getCurrentPositionAsync({});
        const coords = {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        };
        const [cw, fc] = await Promise.all([
          fetchCurrentWeather(coords),
          fetchShortForecast(coords),
        ]);
        setCurrent(cw);
        setForecast(fc);
      } catch (e: any) {
        setPermissionError(e?.message ?? 'Đã xảy ra lỗi');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onRefresh = useCallback(() => {
    (async () => {
      setLoading(true);
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setPermissionError('Cần quyền truy cập vị trí để lấy thời tiết.');
          setLoading(false);
          return;
        }
        const loc = await Location.getCurrentPositionAsync({});
        const coords = {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        };
        const [cw, fc] = await Promise.all([
          fetchCurrentWeather(coords),
          fetchShortForecast(coords),
        ]);
        setCurrent(cw);
        setForecast(fc);
        setPermissionError(null);
      } catch (e: any) {
        setPermissionError(e?.message ?? 'Đã xảy ra lỗi');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#667eea', '#764ba2', '#f093fb', '#f5576c']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
        <ScrollView 
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <PremiumHeader locationName={current?.name} />
          
          {permissionError ? (
            <Animatable.View animation="shake" duration={800}>
              <View style={{
                backgroundColor: 'rgba(255,255,255,0.9)',
                padding: 20,
                borderRadius: 15,
                marginVertical: 20,
              }}>
                <Text style={{ color: '#e74c3c', fontSize: 16, textAlign: 'center' }}>
                  {permissionError}
                </Text>
              </View>
            </Animatable.View>
          ) : (
            <>
              <PremiumWeatherCard weather={current} />
              {forecast.length > 0 && <ForecastGrid items={forecast} />}
            </>
          )}
        </ScrollView>
        
        <FloatingActionButton
          onPress={onRefresh}
          icon="refresh"
          loading={loading}
        />
      </LinearGradient>
    </View>
  );
}
