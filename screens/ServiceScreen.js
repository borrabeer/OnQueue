import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Platform,
  FlatList,
  ActivityIndicator,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getServices, setLoading } from '../store/actions/servicesAction'
import { AntDesign } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';

const ServiceScreen = (props) => {
  const isLoading = useSelector(state => state.services.isLoading);
  const shop_id = props.navigation.getParam("shop_id");
  const shop_image = props.navigation.getParam("shop_image");
  const availableServices = useSelector(state => state.services.services);
  const servicesData = [];
  for (let index = 0; index < availableServices.length; index++) {
    const element = {
      label: availableServices[index].name,
      value: availableServices[index].id,
      icon: () => {
        <AntDesign name="caretright" size={24} color="black" />
      },
      hidden: index == 0 ? true : false
    };
    servicesData.push(element);
  }
  const [SelectService, setSelectService] = useState(servicesData[0] ? servicesData[0].value : null);
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
  return (
    <View style={styles.screen}>
      <View style={styles.bgContainer}>
        <Image source={{ uri: shop_image }} style={styles.bgImage} />
      </View>
      <Text style={{ marginBottom: 10, fontSize: 20, fontWeight: 'bold', color: 'grey', fontFamily: "Prompt_400Regular" }} >เลือกประเภทการบริการ</Text>
      <DropDownPicker items={servicesData} defaultValue={SelectService} containerStyle={{ height: 40 }} onChangeItem={item => setSelectService(item.value)} />
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
    margin: 10,
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  bgImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end"
  },
  bgContainer: {
    width: 313,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ServiceScreen;
