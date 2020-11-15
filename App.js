import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useFonts, Prompt_400Regular, Prompt_700Bold } from '@expo-google-fonts/prompt';
import AppNavigator from "./navigation/AppNavigator";
import { AppLoading } from "expo";
import serviceReducer from "./store/reducers/servicesReducer";
import { Provider, useDispatch } from "react-redux";
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { NavigationContainer } from '@react-navigation/native';
import NavigationService from './NavigationService';

const rootReducer = combineReducers({
  services: serviceReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default function App() {
  let [fontsLoaded] = useFonts({
    Prompt_400Regular,
    Prompt_700Bold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <Provider store={store}>
      <AppNavigator ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }} />
    </Provider>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
});
