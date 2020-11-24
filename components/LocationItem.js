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
import Moment from 'moment';
const LocationItem = (props) => {
  Moment.locale('en');
  // var now = Moment().format('LLL');
  var now2 = new Date();
  var openshop = Moment(props.data.open_time, "h:mm:ss").format('LLL');
  var closeshop = Moment(props.data.close_time, "h:mm:ss").format('LLL');
  var date1 = new Date(openshop);
  var date2 = new Date(closeshop);
  return (
    <View style={styles.container} >
      <TouchableOpacity onPress={props.onSelect}>
        <Card containerStyle={{width: 350}}>
          <View style={styles.row}>
            <View style={{ flexDirection: "row" }}>
              {now2 > date1 && now2 < date2 ? <Image source={{ uri: "https://www.clipartsfree.net/vector/large/49491-small-green-dot-clipart.png" }} style={styles.iconimg} /> :
                <Image source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Basic_red_dot.png" }} style={styles.iconimg} />}
              <View style={styles.column}>
                <Text style={{ fontSize: 20, fontFamily: "Prompt_400Regular",left:20, }}>
                  {props.data.name}
                </Text>
                <Text style={{ fontSize: 16, fontFamily: "Prompt_400Regular",left:20, }}>
                  {props.data.branch}
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
  card1:{
    width: 500,
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
    margin: 10,
    borderRadius: 10,
    shadowColor: "black",
  },
  iconimg: {
    right: 20,
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
