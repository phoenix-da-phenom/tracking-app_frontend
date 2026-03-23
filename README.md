## 📱 Real-Time Tracking App (React Native - Expo)

This is the mobile frontend of the Real-Time Location Sharing & Navigation System, built using React Native with Expo. The app enables real-time communication between a Dispatcher (User A) and a Driver (User B).

User A tracks live location on a map
User B navigates to a destination and shares GPS updates

# 🚀 Features

# 🔐 Authentication

Register & Login
Token-based authentication (Laravel API)
Role-based access:
Dispatcher (User A)
Driver (User B)
🧭 Dispatcher (User A)
Search and set destination
View live map with:
Driver’s current location
Destination marker
Real-time updates without refresh
🚗 Driver (User B)
Receive destination instantly
Open navigation in:
Google Maps (Android)
Apple Maps (iOS)
Share live GPS location every few seconds

# 🗺️ Map Integration

Built using react-native-maps
Real-time marker updates
Smooth tracking experience

# 🏗️ Tech Stack

## React Native (Expo)

Axios (API requests)
React Navigation
react-native-maps
Expo Location API

## 📂 Project Structure

app/ # React Native (Expo)
│ ├── components/
│ ├
│ ├── services/ # API (Axios setup)
│ └── context/
── types/

│

## ⚙️ Installation & Setup

# 1️⃣ Clone the Repository

git clone https://github.com/phoenix-da-phenom/tracking-app_frontend.git
cd your-repo

# 2️⃣ Install dependencies

npm install

## 3️⃣ Install required packages

npm install axios react-native-maps
npx expo install expo-location expo-linking
npm install expo-secure-store
npm install react-native-maps expo-location
