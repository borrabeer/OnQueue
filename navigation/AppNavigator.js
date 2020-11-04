import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryServicesScreen from "../screens/CategoryServicesScreen";
import { Ionicons, AntDesign, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import ScanQrCode from "../screens/ScanQrCode";
import UserService from "../screens/UserService";

const ServicesNavigator = createStackNavigator(
  {
    categories: CategoriesScreen,
    categoryService: CategoryServicesScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: { backgroundColor: "#3671D6" },
      headerTintColor: "white",
    },
  }
);

const ScanQrCodeNavigator = createStackNavigator(
  {
    ScanQrCode: ScanQrCode
  },
  {
    defaultNavigationOptions: {
      headerStyle: { backgroundColor: "#3671D6" },
      headerTintColor: "white",
      headerTitle: "Scan QR Code"
    },
  }
)

const UserServiceNavigator = createStackNavigator(
  {
    UserService: UserService
  },
  {
    defaultNavigationOptions: {
      headerStyle: { backgroundColor: "#3671D6" },
      headerTintColor: "white",
      headerTitle: "OnQueue"
    },
  }
)

const MainNavigator = createBottomTabNavigator(
  {
    Services: {
      screen: ServicesNavigator,
      navigationOptions: {
        tabBarLabel: "บริการ",
        tabBarIcon: ({tintColor}) => {
          return (<FontAwesome5 name="servicestack" size={24} color={tintColor} />)
        }
      }
    },
    ScanQrCode: {
      screen: ScanQrCodeNavigator,
      navigationOptions: {
        tabBarLabel: "สแกนคิว",
        tabBarIcon: ({tintColor}) => {
          return (<MaterialCommunityIcons name="qrcode-scan" size={24} color={tintColor} />)
        }
      }
    },
    UserService: {
      screen: UserServiceNavigator,
      navigationOptions: {
        tabBarLabel: "ล็อคอิน",
        tabBarIcon: ({tintColor}) => {
          return (<AntDesign name="user" size={24} color={tintColor} />)
        }
      }
    }
  },
  {
    defaultNavigationOptions: {
      tabBarOptions: {
        activeBackgroundColor: "#3671D6",
        inactiveBackgroundColor: "#3671D6",
        activeTintColor: "white",
        inactiveTintColor: "black",
        labelStyle: {
          fontFamily: "Prompt_400Regular"
        }
      }
    }
  }
)

export default createAppContainer(MainNavigator);
