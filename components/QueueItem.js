import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import { Card, ListItem, Button, Icon, SearchBar } from 'react-native-elements'

const QueueItem = (props) => {
  return (
    <View style={styles.container} >
      <Card>
        <View style={styles.row}>
          <Text style={styles.textTime}>
            {props.data.time}
        </Text>
          <Text style={styles.textName}>
            {props.data.service.shop.name}
        </Text>
          <TouchableOpacity style={styles.bt2} onPress={props.onSelect}>
            <Text style={styles.textBT}>ดูประวัติ</Text>
          </TouchableOpacity>
        </View>
      </Card>
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
    left: 100,
    width: 80,
    height: 40,
    backgroundColor: "#FFC300",
    borderRadius: 10,
    // justifyContent: "flex-end",
    // position: "absolute",
    // left: 10,
  },
  textTime: {
    flex:1,
    fontFamily: "Prompt_400Regular",
    fontSize: 16,
    
    left: 0,
    position: "absolute",
  },
  textName: {
    flex:1,
    fontFamily: "Prompt_400Regular",
    fontSize: 16,
    top: 20,
    left: 0,
    position: "absolute"
  },
  textBT: {
    color: "white",
    top: 10,
    fontFamily: "Prompt_400Regular",
    fontSize: 16,
    position: "relative",
    left: 10,
  }
});

export default QueueItem;