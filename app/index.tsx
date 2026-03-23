import { AuthContext } from "@/context/AuthContext";
import { Redirect } from "expo-router";
import { useContext } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const { userToken, isLoading } = useContext(AuthContext);

  // ⛔ Wait until token is loaded
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // ✅ Redirect based on auth
  if (userToken) {
    return <Redirect href="/dashboard" />;
  }

  return <Redirect href="/login" />;
}