import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Card, ListItem, Button, Icon, SearchBar } from 'react-native-elements'
import DropDownPicker from 'react-native-dropdown-picker';
import { useDispatch, useSelector } from "react-redux";
import { getAllServicesQueue, setLoading } from "../store/actions/servicesAction";

const AllQueueScreen = (props) => {
  const isLoading = useSelector(state => state.services.isLoading);
  const userToken = useSelector(state => state.services.userToken);
  const manageQueues = useSelector(state => state.services.manageQueues);
  const dispatch = useDispatch();
  const service_id = props.navigation.getParam("service_id")
  const setLoadingHandler = (bool) => {
    dispatch(setLoading(bool))
  }
  const getAllServicesQueueHandler = (token, id) => {
    dispatch(getAllServicesQueue(token, id))
  }
  useEffect(() => {
    setLoadingHandler(true);
    getAllServicesQueueHandler(userToken, service_id)
  }, [])
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  const renderQueueItem = (itemData) => {
    return (
      <View style={styles.container} >
        <Card>
          <View style={styles.row}>

            <Text style={styles.text}>
              คิวที่ 1
        </Text>
            <TouchableOpacity style={styles.bt1}>
              <Text style={styles.text2}>เรียกคิว</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bt2}>
              <Text style={styles.text3}>ลบคิว</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </View>)
  }
  return (
    <View>
      <FlatList data={manageQueues} renderItem={renderQueueItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginLeft: 20,
    justifyContent: 'space-evenly'
  },
  bgImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  container: {
    margin: 10,
  },
  iconimg: {
    right: 30,
    top: 15,
    width: 20,
    height: 20,
    // position: "absolute",
  },
  bt1: {
    //   flex:2,
    left: 70,
    width: 80,
    height: 50,
    backgroundColor: "#4BCF14",
    borderRadius: 10,
    // justifyContent: "flex-end",
    // position: "absolute",
    // left: 10,
  },
  bt2: {
    //   flex: 3,
    left: 40,
    width: 80,
    height: 50,
    backgroundColor: "#BC3B19",
    borderRadius: 10,
    // justifyContent: "flex-end",
    // position: "absolute",
    // left: 10,
  },
  text: {
    //   flex:1,
    fontFamily: "Prompt_400Regular",
    fontSize: 26,
    top: 10,
    left: 1,
    position: "absolute",
  },
  text2: {
    color: "white",
    top: 10,
    fontFamily: "Prompt_400Regular",
    fontSize: 22,
    position: "relative",
    left: 5,
  },
  text3: {
    color: "white",
    top: 10,
    fontFamily: "Prompt_400Regular",
    fontSize: 22,
    position: "relative",
    left: 10,
  }
});

export default AllQueueScreen;
