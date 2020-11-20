import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import { Card, Button } from 'react-native-elements'

const LocationItem = (props) => {
  return (
    <View style={styles.container} >
      <TouchableOpacity onPress={props.onSelect}>
        <Card>
          <View style={styles.row}>
            <Image source={{ uri: "https://www.clipartsfree.net/vector/large/49491-small-green-dot-clipart.png" }} style={styles.iconimg} />
            <View style={styles.column}>
              <Text style={{ fontSize: 20, fontFamily: "Prompt_400Regular", }}>
                {props.data.name}
              </Text>
              <Text style={{ fontSize: 16, fontFamily: "Prompt_400Regular", }}>
                {props.data.branch}
              </Text>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginLeft: 20,
    justifyContent: 'space-evenly'
  },
  column: {
    right: 20,
    // left: 40,
    flexDirection: "column",
    justifyContent: "flex-start",
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
  bt: {
    width: 90,
    color: "#ECD91E",
    // justifyContent: "flex-end",
    // position: "absolute",
    top: 10,
    // left: 10,
    borderRadius: 10,
    fontFamily: "Prompt_400Regular"
  }
});

export default LocationItem;
