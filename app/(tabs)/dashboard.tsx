import { AuthContext } from "@/context/AuthContext";
import React, { useContext, useRef, useState } from "react";
import {
  Animated,
  KeyboardAvoidingView,
  PanResponder,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchLocationComponent from "../components/SearchLocationComponent";
import SetLocationComponent from "../components/SetLocationComponent";

export default function Dashboard() {
  const { logout } = useContext(AuthContext);
  const [currentLocation, setCurrentLocation] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: pan.x, dy: pan.y }, // tracks movement
        ],
        { useNativeDriver: false },
      ),
      onPanResponderRelease: (e, gesture) => {
        // You can check gesture.moveX / moveY for drop logic
        console.log("Dropped at: ", gesture.moveX, gesture.moveY);
        // Optional: reset position
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
    }),
  ).current;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View>
          <Text style={styles.headerText}>Dispatcher Dashboard </Text>
        </View>
        <View style={styles.dashboardComponent}>
          <SetLocationComponent />
          <SearchLocationComponent />
        </View>

        {/* Floating Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  dashboardComponent: {
    flex: 1,
    flexDirection: "column",
    gap: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 25,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "white",
  },
  setButton: {
    marginTop: 10,
    paddingVertical: 15,
    backgroundColor: "#007AFF",
    borderRadius: 10,
    alignItems: "center",
  },
  setButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "black",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5, // for Android shadow
    shadowColor: "#000", // for iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 30,
  },
});
