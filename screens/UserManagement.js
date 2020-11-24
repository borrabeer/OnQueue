import React from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
  TouchableHighlight,
  Image,
  Alert,
} from "react-native";
import UserGridTile from "../components/UserGridTile";
import { useSelector, useDispatch } from "react-redux";
import { USERFUNCTION, STAFFFUNCTION } from "../data/dummy-data";
import * as Action from "../store/types";
import { userLogout, getManageShops, setLoading, getQueueHistory, getManageShopsQueue } from "../store/actions/servicesAction";
import NavigationService from "../NavigationService";

const UserManagement = (props) => {
  const userData = useSelector(state => state.services.userData);
  const userToken = useSelector(state => state.services.userToken);
  let isStaff = false;
  for (let index = 0; index < userData.user.groups.length; index++) {
    const element = userData.user.groups[index];
    if (element["name"] === "Staff") {
      isStaff = true;
    }
  }
  const dispatch = useDispatch();
  const userLogoutHandler = () => {
    dispatch(userLogout());
  }
  const setLoadingHandler = (bool) => {
    dispatch(setLoading(bool));
  }
  const getManageShopsHandler = (token) => {
    dispatch(getManageShops(token));
  }
  const getManageShopsQueueHandler = (token) => {
    dispatch(getManageShopsQueue(token));
  }
  const getQueueHistoryHandler = (token) => {
    dispatch(getQueueHistory(token));
  }
  const UserFunctionOnPress = (id) => {
    switch (id) {
      case Action.USER_LOGOUT:
        userLogoutHandler();
        break;
      case Action.QUEUE_HISTORY:
        setLoadingHandler(true);
        getQueueHistoryHandler(userToken);
        break;
      case Action.SHOP_MANAGE:
        setLoadingHandler(true);
        getManageShopsHandler(userToken);
        break;
      case Action.QUEUE_MANAGE:
        setLoadingHandler(true);
        getManageShopsQueueHandler(userToken);
        break;
      default:
        console.log(id);
    }
  }
  const renderUserFunction = (itemData) => {
    return (
      <UserGridTile
        id={itemData.item.id}
        title={itemData.item.title}
        image={itemData.item.image}
        onPress={UserFunctionOnPress}
      />
    );
  };
  return (
    <View style={styles.screen}>
      <View style={styles.screen}>
        <Text style={[styles.fontBold, { fontSize: 22 }]}>ยินดีต้อนรับสู่แอพพลิเคชั่น OnQueue</Text>
        <Text style={[styles.fontBold, { fontSize: 18 }]}>สวัสดีครับคุณ {userData ? userData.user.first_name : "Username"}</Text>
      </View>
      <View style={{
        flex: 2,
        margin: 20,
        height: 200,
        borderRadius: 10,
        shadowColor: "black",
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 3,
        padding: 15,
        justifyContent: "flex-end",
        backgroundColor: "#ffffff"
      }}>
        <View style={{ flex: 1.5 }} ></View>
        <FlatList renderItem={renderUserFunction} data={isStaff ? STAFFFUNCTION : USERFUNCTION} numColumns={2} />
        <TouchableHighlight
          style={styles.circle}
          underlayColor='#ccc'
        >
          <Image source={{ uri: userData.image }}
            style={{ width: 100, height: 100 }} />
        </TouchableHighlight>

      </View>
    </View>
  );
};
UserManagement.navigationOptions = {
  headerTitle: "OnQueue",
};

const styles = StyleSheet.create({
  circle: {
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    width: Dimensions.get('window').width * 0.4,
    height: Dimensions.get('window').width * 0.4,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    left: 105.5,
    bottom: 400,
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
  griditem: {
    marginTop: 80
  },
  screen: {
    flex: 1,
  },
  viewCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  fontBold: {
    fontWeight: "bold",
    fontFamily: "Prompt_400Regular",
    textAlign: "center",
  }
});

export default UserManagement;