import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Platform,
  FlatList,
} from "react-native";
import { CATEGORIES, SHOPS } from "../data/dummy-data";
import ServiceList from "../components/ServiceList";
import { useSelector } from "react-redux";

const ServiceScreen = (props) => {
  const shopId = props.navigation.getParam("shopId");
  const availableServices = useSelector(state => state.services.services);
  const displayServices = availableServices.filter(
    (shop) => shop.shopId.indexOf(shopId) >= 0
  );
  const renderServiceItem = (itemData) => {
    return (
      <Text>{itemData.item.name}</Text>
    )
  }
  return (
    <View style={styles.screen}>
      <FlatList
        data={displayServices}
        renderItem={renderServiceItem} />
    </View>
  );
};

ServiceScreen.navigationOptions = (navigationData) => {
  const shopId = navigationData.navigation.getParam("shopId");
  const displayShop = SHOPS.find((shop) => shop.id === shopId);
  return {
    headerTitle: displayShop.name
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ServiceScreen;
