import { AuthContext } from '@/context/AuthContext';
import React, { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Dashboard() {
  const { logout } = useContext(AuthContext);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Dashboard</Text>

      <TouchableOpacity
        onPress={logout}
        style={{
          marginTop: 20,
          padding: 10,
          backgroundColor: 'black',
          borderRadius: 5,
        }}
      >
        <Text style={{ color: 'white' }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}