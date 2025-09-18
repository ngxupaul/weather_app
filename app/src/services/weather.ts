import Constants from 'expo-constants';

const OPENWEATHER_API_KEY = Constants.expoConfig?.extra?.OPENWEATHER_API_KEY as string;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export type Coordinates = { latitude: number; longitude: number };

export type CurrentWeather = {
  name: string;
  tempC: number;
  description: string;
  icon: string; // openweather icon code
  humidity: number; // %
  windMs: number; // m/s
  feelsLikeC: number;
  visibilityM: number; // meters
};

export type ForecastItem = {
  dt: number; // unix seconds
  tempC: number;
  description: string;
  icon: string;
};

function assertApiKey(): void {
  if (!OPENWEATHER_API_KEY || OPENWEATHER_API_KEY === 'YOUR_API_KEY_HERE') {
    throw new Error('Missing OpenWeather API key. Set expo.extra.OPENWEATHER_API_KEY in app.json');
  }
}

export async function fetchCurrentWeather(coords: Coordinates): Promise<CurrentWeather> {
  assertApiKey();
  const url = `${BASE_URL}/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=vi`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch current weather: ${res.status}`);
  }
  const json = await res.json();
  return {
    name: json.name,
    tempC: json.main.temp,
    description: json.weather?.[0]?.description ?? '',
    icon: json.weather?.[0]?.icon ?? '01d',
    humidity: json.main?.humidity ?? 0,
    windMs: json.wind?.speed ?? 0,
    feelsLikeC: json.main?.feels_like ?? json.main?.temp ?? 0,
    visibilityM: json.visibility ?? 0,
  };
}

export async function fetchShortForecast(coords: Coordinates): Promise<ForecastItem[]> {
  assertApiKey();
  const url = `${BASE_URL}/forecast?lat=${coords.latitude}&lon=${coords.longitude}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=vi`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch forecast: ${res.status}`);
  }
  const json = await res.json();
  // Return next 6 entries (~18 hours at 3h steps)
  return (json.list as any[])?.slice(0, 6).map((item) => ({
    dt: item.dt,
    tempC: item.main.temp,
    description: item.weather?.[0]?.description ?? '',
    icon: item.weather?.[0]?.icon ?? '01d',
  }));
}


