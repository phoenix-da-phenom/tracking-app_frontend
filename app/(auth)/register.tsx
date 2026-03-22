
import RegisterForm from '@/components/RegisterForm';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';




export default function register() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />

     <RegisterForm/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});