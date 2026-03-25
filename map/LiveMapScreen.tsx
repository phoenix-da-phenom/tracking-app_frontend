// app/live-map.tsx

import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { LatLng, Marker } from 'react-native-maps';
import { io, Socket } from 'socket.io-client';

// Initialize socket
const socket: Socket = io('https://your-backend.com'); // ← change to your real backend URL

export default function LiveMapScreen() {

  
  // Extract query params
  const { destination, lat: latStr, lng: lngStr } = useLocalSearchParams<{
    destination?: string;
    lat?: string;
    lng?: string;
  }>();

  // State for User B's location
  const [userBLocation, setUserBLocation] = useState<LatLng | null>(null);

  // Parse destination coordinates safely
  let destLat = NaN;
  let destLng = NaN;

  if (destination) {
    try {
      const parsed = JSON.parse(destination);
      destLat = Number(parsed.lat);
      destLng = Number(parsed.lng);
    } catch {
      // Fallback: parse lat & lng from query strings
      destLat = latStr ? Number(latStr) : NaN;
      destLng = lngStr ? Number(lngStr) : NaN;
    }
  } else {
    destLat = latStr ? Number(latStr) : NaN;
    destLng = lngStr ? Number(lngStr) : NaN;
  }

  // Listen to location updates from socket
  useEffect(() => {
    const handleLocationUpdate = (location: { lat: number; lng: number }) => {
      setUserBLocation({ latitude: location.lat, longitude: location.lng });
    };

    socket.on('location-update', handleLocationUpdate);

    return () => {
      socket.off('location-update', handleLocationUpdate);
    };
  }, []);

  // Show nothing if destination is invalid
  if (isNaN(destLat) || isNaN(destLng)) {
    return null;
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: destLat,
        longitude: destLng,
        latitudeDelta: 0.015,
        longitudeDelta: 0.015,
      }}
    >
      {/* Destination Marker */}
      <Marker
        coordinate={{ latitude: destLat, longitude: destLng }}
        title="Destination"
        pinColor="red"
      />

      {/* User B Marker */}
      {userBLocation && (
        <Marker
          coordinate={userBLocation}
          title="User B"
          pinColor="blue"
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: { flex: 1 },
});