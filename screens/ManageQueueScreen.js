import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  TouchableHighlight,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Alert
} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import { NavigationActions } from "react-navigation";
import { useDispatch, useSelector } from "react-redux";
import NavigationService from "../NavigationService";
import { setLoading, getAllServicesQueue, updateQueueStatus } from "../store/actions/servicesAction";

const ManageQueueScreen = (props) => {
  const isLoading = useSelector(state => state.services.isLoading);
  const userToken = useSelector(state => state.services.userToken);
  const availableServices = useSelector(state => state.services.manageServices);
  const manageQueues = useSelector(state => state.services.manageQueues);
  console.log(manageQueues);
  const dispatch = useDispatch();
  const setLoadingHandler = (bool) => {
    dispatch(setLoading(bool))
  }
  const getAllServicesQueueHandler = (token, id) => {
    dispatch(getAllServicesQueue(token, id))
  }
  const updateQueueStatusHandler = (token, id, status) => {
    dispatch(updateQueueStatus(token, id, status))
  }
  const shop = props.navigation.getParam("shop");
  const servicesData = [];
  for (let index = 0; index < availableServices.length; index++) {
    const element = {
      label: availableServices[index].name,
      value: availableServices[index].id,
      shop: availableServices[index].shop,
    };
    servicesData.push(element);
  }
  const [SelectService, setSelectService] = useState(null);
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  return (
    <ScrollView style={styles.container} >
      <Image source={{ uri: shop.icon_url }} style={styles.bgImage} />
      <TouchableHighlight
        style={styles.circle}
        underlayColor='#ccc'
      // onPress = { () => alert('Yaay!') }
      >
        <Text style={styles.cctext}> {SelectService ? manageQueues.length > 0 ? manageQueues[0].id : "" : ""} คิวปัจจุบัน </Text>
      </TouchableHighlight>
      <Text style={styles.text}>
        เลือกประเภทบริการ
        </Text>
      <DropDownPicker items={servicesData} defaultValue={SelectService} containerStyle={{ height: 40, width:350, left:23, }} onChangeItem={item => {
        setLoadingHandler(true);
        getAllServicesQueueHandler(userToken, item.value)
        setSelectService(item.value)
      }} />
      <TouchableOpacity style={styles.bt1}
        onPress={() => {
          if (manageQueues.length > 0) {
            setLoadingHandler(true);
            updateQueueStatusHandler(userToken, manageQueues[0].id, "O");
          } else {
            Alert.alert(
              "Oops!",
              "ขณะนี้ไม่มีคิวที่จองอยู่ของบริการดังกล่าว!",
              [
                {
                  text: "ยืนยัน",
                  style: "cancel"
                },
              ],
              { cancelable: false }
            );
          }
        }}>
        <Text style={styles.text1} >
          บริการเสร็จสิ้น เรียกคิวถัดไป
            </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bt2}
        onPress={() => {
          Alert.alert(
            "Warning!",
            "ยืนยันที่จะยกเลิกคิวปัจจุบันหรือไม่",
            [
              {
                text: "ยกเลิก",
                style: "cancel"
              },
              {
                text: "ยืนยัน", onPress: () => {
                  if (manageQueues.length > 0) {
                    setLoadingHandler(true);
                    updateQueueStatusHandler(userToken, manageQueues[0].id, "C");
                  } else {
                    Alert.alert(
                      "Oops!",
                      "ขณะนี้ไม่มีคิวที่จองอยู่ของบริการดังกล่าว!",
                      [
                        {
                          text: "ยืนยัน",
                          style: "cancel"
                        },
                      ],
                      { cancelable: false }
                    );
                  }
                },
                style: "destructive"
              }
            ],
            { cancelable: false }
          );
        }}>
        <Text style={styles.text2} >
          ข้ามคิวปัจจุบัน
            </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bt3}
        onPress={() => {
          if (SelectService != null) {
            NavigationService.navigate("allQueue", {
              service_id: SelectService
            })
          } else {
            Alert.alert(
              "Oops!",
              "กรุณาเลือกบริการที่ต้องการ!",
              [
                {
                  text: "ตกลง",
                  style: "cancel"
                }
              ],
              { cancelable: false }
            );
          }
        }}>
        <Text style={styles.text3} >
          ดูคิวทั้งหมด
            </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  circle: {
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    width: Dimensions.get('window').width * 0.4,
    height: Dimensions.get('window').width * 0.4,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    left: 110,
    top: 20,
    position: "absolute",
    opacity: 1.0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  cctext: {
    color: "#4BCF14",
    fontSize: 24,
    fontFamily: "Prompt_400Regular",
  },
  bgImage: {
    width: "100%",
    height: 200,
    justifyContent: "flex-end",
    opacity: 0.5,
  },
  container: {
    margin: 10,
  },
  bt1: {
    marginTop: 20,
    width: 320,
    top: 20,
    height: 60,
    left: 35,
    justifyContent: "center",
    backgroundColor: "#4BCF14",
    borderRadius: 10,
  },
  bt2: {
    width: 320,
    marginTop: 20,
    top: 20,
    height: 60,
    left: 35,
    justifyContent: "center",
    backgroundColor: "#BC3B19",
    borderRadius: 10,
  },
  bt3: {
    width: 320,
    top: 20,
    marginTop: 20,
    height: 60,
    left: 35,
    justifyContent: "center",
    backgroundColor: "#FFC300",
    borderRadius: 10,
  },
  text1: {
    color: "white",
    // justifyContent: "center",
    left: 40,
    fontSize: 20,
    fontFamily: "Prompt_400Regular",
    position: "absolute"
  },
  text2: {
    color: "white",
    // justifyContent: "center",
    left: 95,
    fontFamily: "Prompt_400Regular",
    fontSize: 22,
    position: "absolute"
  },
  text3: {
    color: "white",
    // justifyContent: "center",
    left: 95,
    fontSize: 24,
    position: "absolute",
    fontFamily: "Prompt_400Regular",
  },
  text: {
    color: "grey",
    // justifyContent: "center",
    // left: 85,
    fontSize: 26,
    left: 23,
    fontFamily: "Prompt_400Regular",
    margin: 10
    // position: "absolute"
  }
});

export default ManageQueueScreen;
