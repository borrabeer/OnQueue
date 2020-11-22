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
import DropDownPicker from 'react-native-dropdown-picker';

const ManagerList = (props) => {
  return (
    <View style={styles.container} >
      <Card>
          <View style={styles.row}>
          <Image source={{uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/LINE_logo.svg/1024px-LINE_logo.svg.png'}} style={styles.logo} />
        {/* <Text style={styles.text}>
            nithan
        </Text> */}
        <Text style={styles.text2}>
            Nithan
        </Text>
        <Text style={styles.text4}>
            game-pp@hotmail.com
        </Text>    
        <TouchableOpacity style={styles.bt2} onPress={() => {
                props.onSelect();
            }}>
            <Text style={styles.text3}>ลบ</Text>
        </TouchableOpacity>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row" ,
    marginLeft: 20, 
    justifyContent: 'space-evenly'
  },
  bgImage: {
    width: "100%",
    height: "100%",
    // justifyContent: "flex-end",
  },
  logo:{
    width: 40,
    height: 40,
    right: 250,
    justifyContent: "flex-start",
    position: "absolute",
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
    backgroundColor: "#D52B20",
    borderRadius: 10,
    // justifyContent: "flex-end",
    // position: "absolute",
    // left: 10,
  },
  text: {
      fontFamily: "prompt",
      fontSize: 20,
      top: 10,
      right: 200,
      position: "absolute",
  },
  text2: {
    fontFamily: "Prompt",
    fontSize: 16,
    top: 5,
    left: 50,
    position: "absolute"
  },
  text4: {
    fontFamily: "Prompt",
    fontSize: 14,
    top: 20,
    left: 50,
    position: "absolute"
  },
  text3: {
    color: "white",
    top: 10,
    fontFamily: "Prompt",
    fontSize: 16,
    position: "relative",
    left: 30,
}
});

export default ManagerList;
