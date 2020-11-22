import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import CategoriesScreen from "../screens/CategoriesScreen";
import ShopScreen from "../screens/ShopScreen";
import QueueScreen from "../screens/QueueScreen";
import QueueHistory from "../screens/QueueHistory";
import { Ionicons, AntDesign, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import ScanQrCode from "../screens/ScanQrCode";
import UserService from "../screens/UserService";
import ServiceScreen from "../screens/ServiceScreen";
import AuthIcon from "../components/AuthIcon";
import AuthTitle from "../components/AuthTitle";
import ManageLocation from "../screens/ManageLocation";
import ManageLocationItem from "../screens/ManageLocationItem";
import ManageService from "../screens/ManageService";
import LocationScreen from "../screens/LocationScreen";
import LocationScreenEdit from "../screens/LocationScreenEdit";
import ServiceDetailScreen from "../screens/ServiceDetailScreen";
import ServiceDetailScreenEdit from "../screens/ServiceDetailScreenEdit";
import { Image } from "react-native";
import ic_qrcode from "../assets/ic_qrcode.png"

const ServicesNavigator = createStackNavigator(
  {
    categories: CategoriesScreen,
    shopScreen: ShopScreen,
    serviceScreen: ServiceScreen,
    queueScreen: QueueScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#3671D6",
      },
      headerTintColor: "white",
      headerTitleStyle: {
        fontFamily: "Prompt_400Regular",
        fontSize: 31
      },
      headerBackTitle: "Back"
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
      headerTitle: "Scan QR Code",
      headerTitleStyle: {
        fontFamily: "Prompt_400Regular",
        fontSize: 31
      }
    },
  }
)

const UserServiceNavigator = createStackNavigator(
  {
    UserService: UserService,
    queueHistory: QueueHistory,
    manageLocation: ManageLocation,
    manageService: ManageService,
    locationScreen: LocationScreen,
    locationEdit: LocationScreenEdit,
    serviceDetail: ServiceDetailScreen,
    serviceEdit: ServiceDetailScreenEdit,
    locationItem: ManageLocationItem,
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
        tabBarIcon: ({ tintColor }) => {
          return (<FontAwesome5 name="servicestack" size={24} color={tintColor} />)
        }
      }
    },
    ScanQrCode: {
      screen: ScanQrCodeNavigator,
      navigationOptions: {
        tabBarLabel: " ",
        tabBarIcon: () => {
          return (<Image source={ic_qrcode} size={15} style={{ transform: [{ scale: 0.32 }] }} />)

        }
      }
    },
    UserService: {
      screen: UserServiceNavigator,
      navigationOptions: {
        tabBarLabel: ({ tintColor }) => {
          return (<AuthTitle color={tintColor} />)
        },
        tabBarIcon: ({ tintColor }) => {
          return (<AuthIcon size={24} color={tintColor} />)
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
