import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  ActivityIndicator,
} from "react-native";
import QueueGridTile from "../components/QueueGridTile";
import { useSelector, useDispatch } from "react-redux";
import { getQueue, setLoading } from "../store/actions/servicesAction";
import NavigationService from "../NavigationService";

const QueueScreen = (props) => {
  const isLoading = useSelector(state => state.services.isLoading);
  const currentQueue = useSelector(state => state.services.queue);
  const userToken = useSelector(state => state.services.userToken);
  const queue_id = props.navigation.getParam("queue_id");
  const dispatch = useDispatch();
  const getQueueHandler = (queue_id, token) => {
    dispatch(getQueue(queue_id, token));
  }
  const setLoadingHandler = (bool) => {
    dispatch(setLoading(bool));
  }
  useEffect(() => {
    setLoadingHandler(true);
    getQueueHandler(queue_id, userToken);
  }, [])
  let queueDetail = []
  if (currentQueue != [] && currentQueue != null) {
    queueDetail = [
      {
        title: "ชื่อร้าน",
        detail: currentQueue.service.shop.name
      },
      {
        title: "สาขา",
        detail: currentQueue.service.shop.branch
      },
      {
        title: "บริการ",
        detail: currentQueue.service.name
      },
      {
        title: "สถานะ",
        detail: currentQueue.status
      },
      {
        title: "จำนวนคิวที่รอ",
        detail: currentQueue.waiting_queue
      },
      {
        title: "เวลาที่รอโดยประมาณ",
        detail: (currentQueue.waiting_queue * currentQueue.service.estimated) + " นาที"
      },
    ]
  }
  const renderGridItem = (itemData) => {
    return (
      <QueueGridTile
        title={itemData.item.title}
        detail={itemData.item.detail}
      />
    );
  };
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  return (
    <View style={styles.screen}>
      <View style={{
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
        justifyContent: "flex-end",
        backgroundColor: "#ffffff"
      }}>
        <FlatList data={queueDetail} renderItem={renderGridItem} />
        <View style={{ alignItems: "center" }}>
          <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Circle-icons-hourglass.svg/1200px-Circle-icons-hourglass.svg.png' }}
            style={{ ...styles.logo }} />
        </View>
        <View style={{ ...styles.container1 }}>
          <Text style={[styles.fontBold, { fontSize: 35, color: "#ffffff" }]}>ยกเลิก</Text>
        </View>
      </View>
    </View>
  );
};
QueueScreen.navigationOptions = {
  headerTitle: "OnQueue",
};

const styles = StyleSheet.create({
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
    width: 130,
    height: 130,
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
    backgroundColor: "#c35c5c",
    height: 60,
  },
});

export default QueueScreen;