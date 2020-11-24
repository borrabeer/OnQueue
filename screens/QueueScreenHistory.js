import React, { useEffect, useState, useRef } from "react";
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
import { getQueue2, setLoading, updateQueueStatus } from "../store/actions/servicesAction";
import NavigationService from "../NavigationService";
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { exp } from "react-native-reanimated";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const QueueScreen = (props) => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const isLoading = useSelector(state => state.services.isLoading);
  const currentQueue = useSelector(state => state.services.queue);
  const userToken = useSelector(state => state.services.userToken);
  const trigger = (((currentQueue.waiting_queue * currentQueue.service.estimated) - 5) * 60) < 0 ? 1 : (((currentQueue.waiting_queue * currentQueue.service.estimated) - 5) * 60);
  // console.log(trigger);
  const queue_id = props.navigation.getParam("queue_id");
  const dispatch = useDispatch();
  const getQueueHandler = (queue_id, token) => {
    dispatch(getQueue2(queue_id, token));
  }
  const setLoadingHandler = (bool) => {
    dispatch(setLoading(bool));
  }
  const updateQueueStatusHandler = (token, id, status) => {
    dispatch(updateQueueStatus(token, id, status))
  }
  // useEffect(() => {
  //   setLoadingHandler(true);
  //   getQueueHandler(queue_id, userToken);
  // }, [])
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    // if (currentQueue.status === "รอเรียกคิว") {
    //   setNotiSchedule();
    // }

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);
  const setNotiSchedule = async () => {
    await schedulePushNotification(trigger);
  }
  let queueDetail = []
  if (currentQueue != [] && currentQueue != null) {
    queueDetail = [
      {
        title: "หมายเลขคิว",
        detail: currentQueue.id
      },
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
          {currentQueue.status === "รอเรียกคิว" ?
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Circle-icons-hourglass.svg/1200px-Circle-icons-hourglass.svg.png' }}
              style={{ ...styles.logo }} /> :
            <Image source={{ uri: 'https://www.kindpng.com/picc/m/80-807690_check-mark-well-icon-internet-circle-good-correct.png' }}
              style={{ ...styles.logo }} />
          }
        </View>
        {currentQueue.status === "รอเรียกคิว" ?
          <TouchableOpacity style={{ ...styles.container1 }} onPress={() => {
            setLoadingHandler(true);
            updateQueueStatusHandler(userToken, currentQueue.id, "C");
            setLoadingHandler(true);
            getQueueHandler(currentQueue.id, userToken);
          }}>
            <Text style={[styles.fontBold, { fontSize: 35, color: "#ffffff" }]}>ยกเลิก</Text>
          </TouchableOpacity> :
          <TouchableOpacity style={{ ...styles.container1, backgroundColor: "#A1A1A1" }}>
            <Text style={[styles.fontBold, { fontSize: 35, color: "#ffffff" }]}>ยกเลิก</Text>
          </TouchableOpacity>
        }
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

async function schedulePushNotification(time) {
  console.log(time);
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "OnQueue",
      body: 'ใกล้ถึงลำดับคิวของคุณแล้ว รีบกลับไปที่ร้านเร็ว!',
      data: { data: 'goes here' },
    },
    trigger: { seconds: time }
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

export default QueueScreen;