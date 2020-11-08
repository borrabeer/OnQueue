import React, { useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Platform,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { CATEGORIES, SHOPS } from "../data/dummy-data";
import ServiceList from "../components/ServiceList";
import { useSelector, useDispatch } from "react-redux";
import { getServices, setLoading } from '../store/actions/servicesAction'

const ServiceScreen = (props) => {
  const isLoading = useSelector(state => state.services.isLoading);
  const shop_id = props.navigation.getParam("shop_id");
  const availableServices = useSelector(state => state.services.services);
  const dispatch = useDispatch();
  const getServicesHandler = (shop_id) => {
    dispatch(getServices(shop_id))
  }
  const setLoadingHandler = (bool) => {
    dispatch(setLoading(bool))
  }
  useEffect(() => {
    setLoadingHandler(true);
    getServicesHandler(shop_id);
  }, []);
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  const renderServiceItem = (itemData) => {
    return (
      <Text>{itemData.item.name}</Text>
    )
  }
  return (
    <View style={styles.screen}>
      <FlatList
        data={availableServices}
        renderItem={renderServiceItem} />
    </View>
  );
};

ServiceScreen.navigationOptions = (navigationData) => {
  const shop_name = navigationData.navigation.getParam("shop_name");
  return {
    headerTitle: shop_name
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
