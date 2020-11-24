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
import NavigationService from "../NavigationService";
import { getQueue, setLoading } from "../store/actions/servicesAction";

const QueueHistory = (props) => {
  const isLoading = useSelector(state => state.services.isLoading);
  const currentQueue = useSelector(state => state.services.queuesHistory);
  const userToken = useSelector(state => state.services.userToken);
  const dispatch = useDispatch();
  const getQueueHandler = (queue_id, token) => {
    dispatch(getQueue(queue_id, token));
  }
  const setLoadingHandler = (bool) => {
    dispatch(setLoading(bool));
  }
  const renderQueueItem = (itemData) => {
    return (
      <QueueItem
        data={itemData.item}
        onSelect={() => {
          setLoadingHandler(true);
          getQueueHandler(itemData.item.id, userToken);
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
QueueHistory.navigationOptions = {
  headerTitle: "OnQueue",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  }
});

export default QueueHistory;