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
import QueueItem from "../components/QueueItem";
import { useSelector, useDispatch } from "react-redux";
import { getQueueHistory, setLoading } from "../store/actions/servicesAction";
import NavigationService from "../NavigationService";

const QueueScreen = (props) => {
  const isLoading = useSelector(state => state.services.isLoading);
  const userToken = useSelector(state => state.services.userToken);
  const currentQueue = useSelector(state => state.services.queuesHistory);
  const dispatch = useDispatch();
  const getQueueHistoryHandler = () => {
    dispatch(getQueueHistory(userToken));
  }
  const setLoadingHandler = (bool) => {
    dispatch(setLoading(bool));
  }
  useEffect(() => {
    setLoadingHandler(true);
    getQueueHistoryHandler();
  }, [])
  const renderQueueItem = (itemData) => {
    return (
      <QueueItem
        data={itemData.item}
        onSelect={() => {
          NavigationService.navigate("queueScreen", {
            queue_id: itemData.item.id
          });
        }}
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
      <FlatList data={currentQueue} renderItem={renderQueueItem} />
    </View>
  );
};
QueueScreen.navigationOptions = {
  headerTitle: "OnQueue",
};

const styles = StyleSheet.create({
  screen: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  }
});

export default QueueScreen;