// component/LoginForm.jsx
import { Link } from "expo-router";
import React, { useState } from "react";

import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    // Replace with real auth logic later
    Alert.alert("Login Successful", `Welcome ${email.split("@")[0]}!`);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingView}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled" // lets you tap outside to dismiss keyboard
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Login</Text>

        

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Login</Text>

              
          </TouchableOpacity>
              <View style={styles.linkContainer}>
                      <Text style={styles.linkText}>
                        I don't have  an account!{" "}
                        <Link href="/register" style={styles.linkHighlight}>
                        Register
                        </Link>
                      </Text>
                    </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
    linkContainer: {
  marginTop: 24,
  alignItems: 'center',
},

linkText: {
  fontSize: 15,
  color: '#6b7280', // subtle gray
},

linkHighlight: {
  color: '#3b82f6', // same as button
  fontWeight: '600',
},
  keyboardAvoidingView: {
    flex: 1,
  },
  innerContainer: {
    paddingHorizontal: 32,
    paddingVertical: 90,
  },
  scrollContent: {
    flexGrow: 1, // ← crucial
    justifyContent: "center", // keep centered when content is short
  },
  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 48,
    textAlign: "center",
  },
  input: {
    height: 54,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    marginBottom: 20,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  button: {
    height: 54,
    backgroundColor: "#3b82f6",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default LoginForm;
