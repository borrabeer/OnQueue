
import React, { useState } from "react";
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
  ActivityIndicator,
} from "react-native";
import { NavigationActions } from "react-navigation";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, getEditShop, getManageServices, getManageShopItem, getManageUser } from "../store/actions/servicesAction";

const ManageLocationItem = (props) => {
  const isLoading = useSelector(state => state.services.isLoading);
  const userToken = useSelector(state => state.services.userToken);
  const editShop = useSelector(state => state.services.editShop);
  const dispatch = useDispatch();
  const setLoadingHandler = (bool) => {
    dispatch(setLoading(bool))
  }
  const getEditShopHandler = (token, id) => {
    dispatch(getEditShop(token, id));
  }
  const getManageUserHandler = (token, id) => {
    dispatch(getManageUser(token, id));
  }
  const getManageServicesHandler = (token, id) => {
    dispatch(getManageServices(token, id));
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
        
        <Text style={{ ...styles.fontInput }}>   ชื่อร้าน</Text>
        <Text
          style={{ ...styles.input }}
        > {editShop.name}</Text>
        <Text style={{ ...styles.fontInput }}>   สาขา</Text>
        <Text
          style={{ ...styles.input }}
        > {editShop.branch}</Text>
        <View style={{

          marginRight: 15,
          flexDirection: "row",
          justifyContent: "space-between",
        }}>
          <Text style={{ ...styles.fontInput, marginTop: 10 }}>   เปิด/ปิดร้าน</Text>
          <Switch style={{ margin: 10 }}
            trackColor={{ false: "#ffffff", true: "#60c459" }}
            thumbColor={editShop.status ? "#ffffff" : "#ffffff"}
            ios_backgroundColor="#c25e5e"
            value={editShop.status}
            disabled
          />
        </View>



        <TouchableOpacity style={{ ...styles.button, backgroundColor: "#e6c059", }} onPress={() => {
          setLoadingHandler(true);
          getEditShopHandler(userToken, editShop.id);
        }}>
          <Text style={[styles.fontButton, { fontSize: 25, color: "ffffff" }]}>แก้ไข</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ ...styles.button, backgroundColor: "#c25e5e", }} onPress={() => {
          setLoadingHandler(true);
          getManageUserHandler(userToken, editShop.id);
        }}>
          <Text style={[styles.fontButton, { fontSize: 25, color: "#ffffff" }]}>รายชื่อผู้จัดการร้าน</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ ...styles.button, backgroundColor: "#64c460", }} onPress={() => {
          setLoadingHandler(true);
          getManageServicesHandler(userToken, editShop.id);
        }}>
          <Text style={[styles.fontButton, { fontSize: 25, color: "#ffffff" }]}>จัดการบริการ</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
ManageLocationItem.navigationOptions = {
  headerTitle: "จัดการสถานที่",
};


const styles = StyleSheet.create({

  button: {
    margin: 10,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    padding: 3,
    justifyContent: "flex-end",

    height: 50,

    width: 340,




  },
  fontButton: {

    fontWeight: "bold",
    fontFamily: "Prompt_400Regular",
    textAlign: "center",
    justifyContent: "center",

  },
  fontInput: {
    marginTop: 5,
    fontSize: 16,
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
    height: 40,
    borderRadius: 10,
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    padding: 3,
    justifyContent: "flex-end",
    backgroundColor: "#F0F0F0",
    color: 'black',
    fontFamily: "Prompt_400Regular",
    fontSize: 16,
    textAlign: "auto",
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

export default ManageLocationItem;