import { AuthContext } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { TextInput as PaperInput } from "react-native-paper";

export default function SetLocationComponent (){
  const { logout } = useContext(AuthContext);
   const [currentLocation, setCurrentLocation] = useState("");
   const [searchLocation, setSearchLocation] = useState("");
 
    return (
        <View style={styles.content}>
                <Text style={styles.heading}>Set Your Destination</Text>
      
                {/* Current Location Input */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Set Location</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your current location"
                    value={currentLocation}
                    onChangeText={setCurrentLocation}
                  />
                </View>
      
                {/* Search Destination Input */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Search Destination</Text>
                  <PaperInput
                    label="Set Location"
                    value={currentLocation}
                    onChangeText={setCurrentLocation}
                    mode="outlined"
                    outlineColor="#007AFF"
                    activeOutlineColor="#34C759"
                    left={
                      <PaperInput.Icon
                        icon={() => (
                          <Ionicons
                            name="location-outline"
                            size={20}
                            color="#007AFF"
                          />
                        )}
                      />
                    }
                    style={{ marginBottom: 20 }}
                  />
                </View>
      
                {/* Set Location Button */}
                <TouchableOpacity
                  style={styles.setButton}
                  onPress={() =>
                    console.log(
                      "Current:",
                      currentLocation,
                      "Destination:",
                      searchLocation,
                    )
                  }
                >
                  <Text style={styles.setButtonText}>Set Destination</Text>
                </TouchableOpacity>
              </View>
    )
  }
const styles = StyleSheet.create({
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
    zIndex:40
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
});
