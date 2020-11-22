import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Switch,
  Button,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  Dimensions,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { createShop, setLoading, setEditService, deleteService } from "../store/actions/servicesAction";

const ServiceDetailScreenEdit = (props) => {
  const dispatch = useDispatch();
  const setLoadingHandler = (bool) => {
    dispatch(setLoading(bool));
  }
  const editService = useSelector(state => state.services.editService);
  const [serviceName, setServiceName] = useState(editService.name);
  const [waitingTime, setWaitingTime] = useState(editService.estimated);
  const [isEnabled, setIsEnabled] = useState(editService.status);
  const isLoading = useSelector(state => state.services.isLoading);
  const userToken = useSelector(state => state.services.userToken);
  const shop_id = props.navigation.getParam("shop_id");
  const setEditServiceHandler = () => {
    if (serviceName === null || serviceName === "" || serviceName === " ") {
      Alert.alert("Information", "กรุณาใส่ชื่อบริการ")
    }
    else if (waitingTime === null || waitingTime === "" || waitingTime === " ") {
      Alert.alert("Information", "กรุณาระบุเวลารอคิวโดยประมาณ")
    }
    else {
      setLoadingHandler(true);
      dispatch(setEditService(userToken, editService.id, {
        shop_id: editService.shop.id,
        service_name: serviceName,
        waiting_time: Number.parseInt(waitingTime),
        status: isEnabled,
      }))
    }
  }
  const deleteServiceHandler = (token, id, shop_id) => {
    dispatch(deleteService(token, id, shop_id));
  }
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  return (
    <View style={styles.screen}>
      <View
        style={{ ...styles.container, ...{ backgroundColor: "#F0F0F0", } }}
      ></View>

      <ScrollView style={{
        flex: 1,
        margin: 20,
        height: 200,
        borderRadius: 10,
        shadowColor: "black",
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 3,
        padding: 3,
        // justifyContent: "flex-end",
        backgroundColor: "#ffffff"

      }}>
        <Text style={{ ...styles.fontInput }}>   ชื่อบริการ</Text>
        <TextInput
          style={{ ...styles.input }}
          defaultValue={serviceName}
          placeholder="กรุณาใส่ชื่อชื่อบริการ"
          onChangeText={text => setServiceName(text)}
        />
        <Text style={{ ...styles.fontInput }}>   ระยะรอเวลาต่อคิวโดยประมาณ (นาที)</Text>
        <TextInput
          style={{ ...styles.input }}
          defaultValue={waitingTime.toString()}
          placeholder="กรุณาระบุเวลารอโดยประมาณ (นาที)"
          onChangeText={text => setWaitingTime(text)}
        />
        <View style={{
          flex: 1,
          marginRight: 15,
          flexDirection: "row",
          justifyContent: "space-between",
        }}>



          <Text style={{ ...styles.fontInput }}>   สถานะ</Text>
          <Switch style={{}}
            trackColor={{ false: "#ffffff", true: "#60c459" }}
            thumbColor={isEnabled ? "#ffffff" : "#ffffff"}
            ios_backgroundColor="#c25e5e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />

        </View>
        <TouchableOpacity style={{ ...styles.button }} onPress={setEditServiceHandler}>
          <Text style={[styles.fontButton, { fontSize: 25, color: "#ffffff" }]}>แก้ไขข้อมูลบริการ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ ...styles.button, backgroundColor: "#c25e5e", }} onPress={() => {
          Alert.alert(
            "Alert",
            "ต้องการลบร้านค้านี้จริงหรือไม่ ?",
            [
              {
                text: "ยกเลิก",
                style: "cancel"
              },
              {
                text: "ยืนยัน",
                onPress: () => {
                  setLoadingHandler(true);
                  deleteServiceHandler(userToken, editService.id, editService.shop.id)
                },
                style: "destructive"
              }
            ],
            { cancelable: false }
          );
        }}>
          <Text style={[styles.fontButton, { fontSize: 25, color: "#ffffff" }]}>ลบบริการนี้</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
ServiceDetailScreenEdit.navigationOptions = (navigationData) => {
  return {
    headerTitle: "เพิ่มบริการ",
  }
};


const styles = StyleSheet.create({

  button: {
    margin: 15,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    padding: 3,
    justifyContent: "flex-end",
    backgroundColor: "#64c460",
    height: 50,
    // position: 'absolute',
    width: 340,
  },
  fontButton: {
    fontWeight: "bold",
    fontFamily: "Prompt_400Regular",
    textAlign: "center",

  },
  fontInput: {
    fontWeight: "bold",
    fontFamily: "Prompt_400Regular",

  },
  container2: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
  mapStyle: {
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: 366,
    height: 265,
  },
  container2: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },


  input: {
    margin: 10,
    height: 50,
    borderRadius: 10,
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    padding: 3,
    justifyContent: "flex-end",
    backgroundColor: "#F0F0F0",
    color: 'black',
    fontFamily: "Prompt_400Regular"
  },
  inputTime: {
    margin: 10,
    height: 40,
    width: 120,
    borderRadius: 10,
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    padding: 3,
    justifyContent: "flex-end",
    backgroundColor: "#F0F0F0",
    color: '#bebebe'
  },
  input2: {
    margin: 10,
    height: 50,
    borderRadius: 10,
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    padding: 3,
    justifyContent: "flex-end",
    backgroundColor: "#F0F0F0",
    color: '#bebebe'
  },
  gridItem: {
    flex: 1,
    margin: 10,
    height: 50,
  },
  screen: {
    flex: 1,
  },
  logo: {

    alignItems: "center",
    width: 150,
    height: 150,
  },
  viewCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  fontBold: {
    fontWeight: "bold",
    fontFamily: "Prompt_400Regular",
    textAlign: "center",
  },

  container1: {

    margin: 15,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    padding: 3,
    justifyContent: "flex-end",
    backgroundColor: "#808080",
    height: 80,
  },
});

export default ServiceDetailScreenEdit;