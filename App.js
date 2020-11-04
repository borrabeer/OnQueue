import React from "react";
import { StyleSheet } from "react-native";
import { useFonts, Prompt_400Regular } from '@expo-google-fonts/prompt';
import AppNavigator from "./navigation/AppNavigator";
import { AppLoading } from "expo";

export default function App() {
  let [fontsLoaded] = useFonts({
    Prompt_400Regular,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return <AppNavigator/>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
});
