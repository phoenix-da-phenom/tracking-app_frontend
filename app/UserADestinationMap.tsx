// app/screens/UserADestinationMap.tsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker } from 'react-native-maps';
import io from 'socket.io-client';

const socket = io('https://your-backend.com'); // replace with your backend

export default function UserADestinationMap() {
  const [destination, setDestination] = useState<{latitude: number, longitude: number} | null>(null);
  const [userBPosition, setUserBPosition] = useState<{latitude: number, longitude: number} | null>(null);

  // Listen for User B's live position
  useEffect(() => {
    socket.on('userBLocation', (pos: {lat: number, lng: number}) => {
      setUserBPosition({ latitude: pos.lat, longitude: pos.lng });
    });

    return () => {
      socket.off('userBLocation');
    };
  }, []);

  // Save destination to backend
  const handleSetDestination = async () => {
    if (!destination) return;
    socket.emit('setDestination', destination); // push in real-time
    await axios.post('https://your-backend.com/destination', destination);
    alert('Destination set!');
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Google Places Search */}
      <GooglePlacesAutocomplete
        placeholder="Search destination"
        onPress={(data, details = null) => {
          const lat = details?.geometry.location.lat;
          const lng = details?.geometry.location.lng;
          if (lat && lng) setDestination({ latitude: lat, longitude: lng });
        }}
        query={{
          key: 'YOUR_GOOGLE_API_KEY',
          language: 'en',
        }}
        fetchDetails
        styles={{ container: { flex: 0 }, listView: { backgroundColor: 'white' } }}
      />

      {/* Set Destination Button */}
      <Button title="Set Destination" onPress={handleSetDestination} />

      {/* Map */}
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: destination?.latitude || 6.5244,
          longitude: destination?.longitude || 3.3792,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {destination && <Marker coordinate={destination} title="Destination" />}
        {userBPosition && <Marker coordinate={userBPosition} title="User B" pinColor="blue" />}
      </MapView>
    </View>
  );
}