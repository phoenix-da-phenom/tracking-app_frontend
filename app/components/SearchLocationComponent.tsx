import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";

export default function SearchLocationComponent() {
  const [query, setQuery] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Title */}
      <View>
        <Text style={styles.driverText}>Search Driver Location</Text>
      </View>

      {/* Bottom Search Bar */}
      <View style={styles.bottomContainer}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={22} color="#333" />
          <TextInput
            style={styles.input}
            placeholder="Where are you going?"
            placeholderTextColor="#888"
            value={query}
            onChangeText={setQuery}
          />
          <Ionicons name="location-outline" size={22} color="#007AFF" />
        </View>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },

  driverText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 50,
  },

  bottomContainer: {
    position: "absolute",
    bottom: 120,
    left: 15,
    right: 15,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingHorizontal: 15,
    height: 55,

    // Shadow (iOS)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,

    // Shadow (Android)
    elevation: 6,
  },

  input: {
    flex: 1,
    fontSize: 16,
    marginHorizontal: 10,
  },


});