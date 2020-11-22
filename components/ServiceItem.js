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

const ServiceItem = (props) => {
  return (
    <View style={styles.container} >
      <TouchableOpacity onPress={props.onEdit}>
        <Card containerStyle={{width: 300}}>
        <View style={styles.row}>
        <View style={{ flexDirection: "row" }}>
          <Image source={{ uri: "https://www.clipartsfree.net/vector/large/49491-small-green-dot-clipart.png" }} style={styles.iconimg} />
          <View style={styles.column}>
            <Text style={{ fontSize: 20, fontFamily: "Prompt_400Regular", left: 20, }}>
              {props.data.name}
            </Text>
            
          </View>
          
          
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
    justifyContent: "flex-start",
    
  },
  column: {
    right: 20,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  bgImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  container: {
    margin: 5,
    borderRadius: 10,
    shadowColor: "black",
  },
  iconimg: {
    right: 20,
    top: 5,
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
export default ServiceItem;
