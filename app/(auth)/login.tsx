
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import LoginForm from '../components/LoginForm';
// import LoginForm from './component/LoginForm';   


export default function login() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />

   
    <LoginForm/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});