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

import axiosInstance from "@/service/axiosInstance";
import { Picker } from "@react-native-picker/picker";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selected, setSelected] = useState("");
  const [userName, setUserName] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try{
        const response = await axiosInstance.post('/register', {
          email,
          password,
          role: selected,
          name:userName,
          
        })
     const {token, user} = response.data;
     console.log("the token is ", token, "this is user", user)

    }catch(error){
console.log(` the error is ${error}`)

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
          <Text style={styles.title}>Register</Text>

          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#999"
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            value={userName}
            onChangeText={setUserName}
          />

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

          <View style={styles.container}>
            <Text style={styles.label}>Select Role</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={selected}
                onValueChange={(itemValue) => setSelected(itemValue)}
                style={styles.picker}
                dropdownIconColor="#333"
              >
                <Picker.Item label="Select option" value="" color="#999" />
                <Picker.Item
                  label="Dispatcher"
                  value="dispatcher"
                  color="#000"
                />
                <Picker.Item label="Driver" value="driver" color="#000" />
              </Picker>
            </View>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.linkContainer}>
            <Text style={styles.linkText}>
              Have an account?{" "}
              <Link href="/login" style={styles.linkHighlight}>
                Login
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
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
  },

  picker: {
    height: Platform.OS === "ios" ? 150 : 50,
    width: "100%",
    color: "#000", // 👈 IMPORTANT (fix invisible text)
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  innerContainer: {
    paddingHorizontal: 32,
    paddingVertical: 40,
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
  container: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  dropdown: {
    height: 54,
    borderColor: "#d1d5db",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#9ca3af",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#111827",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default RegisterForm;
