# 🌤️ Weather App - Premium React Native

Ứng dụng thời tiết hiện đại với thiết kế glassmorphism và animation mượt mà, được xây dựng bằng React Native Expo.

## ✨ Tính năng

- 📍 **Định vị tự động** - Lấy thời tiết theo vị trí hiện tại
- 🌡️ **Thời tiết hiện tại** - Nhiệt độ, độ ẩm, gió, tầm nhìn
- ⏰ **Dự báo ngắn hạn** - 6 giờ tiếp theo với layout grid đẹp mắt
- 🎨 **UI Premium** - Glassmorphism design với blur effects
- 🌈 **Dynamic Gradients** - Màu sắc thay đổi theo nhiệt độ và thời gian
- 🔄 **Pull to Refresh** - Floating action button với animation
- 📱 **Cross Platform** - iOS, Android, và Web

## 🛠️ Công nghệ sử dụng

- **React Native** + **Expo** (SDK 54)
- **TypeScript** - Type safety
- **React Native Elements** - Premium UI components
- **Expo Blur** - Glassmorphism effects
- **React Native Animatable** - Smooth animations
- **Expo Linear Gradient** - Dynamic gradients
- **OpenWeatherMap API** - Weather data
- **Expo Location** - GPS positioning

## 📋 Yêu cầu hệ thống

- **Node.js** 18+ 
- **npm** hoặc **yarn**
- **Expo CLI** (optional)
- **iOS Simulator** / **Android Emulator** / **Expo Go app**

## 🚀 Hướng dẫn cài đặt

### 1. Clone và cài đặt dependencies

```bash
cd weather_app/app
npm install
```

### 2. Cấu hình API Key

1. Đăng ký tài khoản miễn phí tại [OpenWeatherMap](https://openweathermap.org/api)
2. Lấy API key từ dashboard
3. Mở file `app/app.json`
4. Thay thế `YOUR_API_KEY_HERE` bằng API key của bạn:

```json
{
  "expo": {
    "extra": {
      "OPENWEATHER_API_KEY": "your_actual_api_key_here"
    }
  }
}
```

### 3. Chạy ứng dụng

#### 📱 iOS (macOS only)
```bash
npm run ios
```

#### 🤖 Android
```bash
npm run android
```

#### 🌐 Web Browser
```bash
npm run web
```

#### 📲 Expo Go (Physical Device)
```bash
npm start
# Scan QR code with Expo Go app
```

## 🔧 Troubleshooting

### Lỗi Metro Bundler
```bash
# Clear cache và reinstall
rm -rf node_modules
npm install
npx expo start -c
```

### Lỗi Permission Location
- **iOS**: Cho phép truy cập vị trí khi app yêu cầu
- **Android**: Bật Location Services trong Settings
- **Web**: Cho phép location access trên browser

### Lỗi API Network
- Kiểm tra kết nối internet
- Xác nhận API key đã cấu hình đúng
- Kiểm tra quota API limit (1000 calls/day free)

## 📁 Cấu trúc project

```
app/
├── src/
│   ├── components/
│   │   ├── PremiumWeatherCard.tsx    # Main weather display
│   │   ├── ForecastGrid.tsx          # Hourly forecast
│   │   ├── PremiumHeader.tsx         # App header
│   │   └── FloatingActionButton.tsx  # Refresh button
│   └── services/
│       └── weather.ts                # API calls
├── App.tsx                           # Main app component
├── app.json                          # Expo configuration
├── package.json                      # Dependencies
└── babel.config.js                   # Babel config
```

## 🎨 Customization

### Thay đổi màu sắc
Chỉnh sửa gradients trong các component:
- `PremiumWeatherCard.tsx` - Màu theo nhiệt độ
- `ForecastGrid.tsx` - Màu theo thời gian trong ngày
- `App.tsx` - Background gradient chính

### Thêm tính năng
- **AQI (Air Quality)**: Tích hợp thêm API
- **Weather Radar**: Sử dụng MapBox
- **Notifications**: Push thông báo thời tiết
- **Multiple Locations**: Lưu nhiều địa điểm

## 📄 License

MIT License - Sử dụng tự do cho mục đích cá nhân và thương mại.

## 🤝 Contributing

1. Fork project
2. Tạo feature branch: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m 'Add AmazingFeature'`
4. Push branch: `git push origin feature/AmazingFeature`
5. Tạo Pull Request

## 📞 Support

Nếu gặp vấn đề, hãy:
1. Kiểm tra [Issues](../../issues) có sẵn
2. Tạo issue mới với mô tả chi tiết
3. Attach logs và screenshots nếu có

---

**Enjoy coding! 🚀**
