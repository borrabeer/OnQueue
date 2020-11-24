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
import { SafeAreaView } from "react-navigation";
import { Card } from "react-native-elements";

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
    <SafeAreaView style={{flex:1}}> 
      <Card>

        <View style={styles.bgContainer}>
          <Image source={{ uri: shop_image }} style={styles.bgImage} />
        </View>

        <Text style={{ marginBottom: 10, fontSize: 20, fontWeight: 'bold', color: 'grey',marginTop: 10, fontFamily: "Prompt_400Regular" }} >เลือกประเภทการบริการ</Text>
        <DropDownPicker items={servicesData} defaultValue={SelectService} containerStyle={{ height: 40 }} onChangeItem={item => setSelectService(item.value)} />
        
        <View >
        <TouchableOpacity onPress={bookQueue}>
          <View style={styles.btStyles}>
          <Text style={styles.textStyles}>ยืนยันการจอง</Text>
          </View>
        </TouchableOpacity>
        </View>
        </Card>
    </SafeAreaView>


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
    backgroundColor: "#FFFFFF",
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  bgImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end"
  },
  textStyles:{
    
    marginTop: 6,
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Prompt_700Bold",
    color: "#FFFFFF",
    textAlign: "center",


  },
  btStyles:{
    
    width: "100%",
        marginTop:20,
        height: 50,
        borderRadius: 10,
        shadowColor: "black",
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 3,
        padding: 3,
        // justifyContent: "flex-end",
        backgroundColor: "#60c459"
  },



  bgContainer: {
    
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ServiceScreen;
