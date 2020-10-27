import React from "react";
import { StyleSheet } from "react-native";

import ServicesNavigator from "./navigation/ServicesNavigator";

export default function App() {
  return <ServicesNavigator/>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
});
