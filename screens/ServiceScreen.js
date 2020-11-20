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
  Alert,
  TouchableOpacity
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getServices, setLoading } from '../store/actions/servicesAction'
import { AntDesign } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import { createBookingQueue } from "../store/actions/servicesAction";
import NavigationService from "../NavigationService";

const ServiceScreen = (props) => {
  const isLoading = useSelector(state => state.services.isLoading);
  const isLogin = useSelector(state => state.services.isLogin);
  const userToken = useSelector(state => state.services.userToken);
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
    };
    servicesData.push(element);
  }
  const [SelectService, setSelectService] = useState(null);
  const dispatch = useDispatch();
  const getServicesHandler = (shop_id) => {
    dispatch(getServices(shop_id))
  }
  const setLoadingHandler = (bool) => {
    dispatch(setLoading(bool))
  }
  const createBookingQueueHandler = (token, service_id) => {
    dispatch(createBookingQueue(token, service_id))
  }
  useEffect(() => {
    setLoadingHandler(true);
    getServicesHandler(shop_id);
  }, []);
  const bookQueue = () => {
    if (SelectService != null) {
      if (isLogin) {
        console.log("ServiceScreen : " + userToken);
        setLoadingHandler(true)
        createBookingQueueHandler(userToken, SelectService);
      } else {
        Alert.alert(
          "Please Login first!",
          "กรุณาล็อคอินก่อนทำการจอง",
          [
            {
              text: "ยกเลิก",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "ล็อคอิน", onPress: () => NavigationService.navigate("UserService") }
          ],
          { cancelable: false }
        );
      }
    } else {
      Alert.alert(
        "Please Select your service!",
        "กรุณาเลือกบริการที่ต้องการจอง",
      );
    }
  }
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
      <TouchableOpacity onPress={bookQueue}>
        <Text>ยืนยันการจอง</Text>
      </TouchableOpacity>
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
