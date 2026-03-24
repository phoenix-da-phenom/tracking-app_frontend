// app/logout.tsx
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Alert } from 'react-native';

export default function LogoutScreen() {
  const router = useRouter();

  useEffect(() => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel', onPress: () => router.back() },
        { text: 'Yes', onPress: () => router.replace('/login') },
      ]
    );
  }, []);

  return null; // nothing to render
}