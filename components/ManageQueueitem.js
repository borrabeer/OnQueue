import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  TouchableHighlight,
  Dimensions
} from "react-native";
import { Card, ListItem, Button, Icon, SearchBar } from 'react-native-elements'
import DropDownPicker from 'react-native-dropdown-picker';

const ManageQueueitem = (props) => {
  return (
    <View style={styles.container} >
        <Image source={{ uri: "https://dhdnzx78tqry5.cloudfront.net/uploads/thailand/deal/thumb/3559.jpg"}} style={styles.bgImage} />
        <TouchableHighlight
        style={styles.circle}
        underlayColor = '#ccc'
        // onPress = { () => alert('Yaay!') }
        >
        <Text style={styles.cctext}> 15 คิวปัจจุบัน </Text>
        </TouchableHighlight>
        <DropDownPicker
            items={[
                {label: 'จองโต๊ะ', value: 'usa', icon: () => <Icon name="flag" size={18} color="#900" />, hidden: true},
                {label: 'กลับบ้าน', value: 'uk', icon: () => <Icon name="flag" size={18} color="#900" />},
            ]}
            style={{marginTop: 20}}
        />
        <Text style={styles.text}>
            เลือกประเภทบริการ
        </Text>
        <TouchableOpacity style={styles.bt1}
        onPress={() => {
            props.onSelect3();
          }}>
            <Text style={styles.text1} >
                บริการเสร็จสิ้น เรียกคิวถัดไป
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bt2}
        onPress={() => {
            props.onSelect2();
          }}>
            <Text style={styles.text2} >
                ข้ามคิวปัจจุบัน
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bt3}
        onPress={() => {
            props.onSelect();
          }}>
            <Text style={styles.text3} >
                ดูคิวทั้งหมด
            </Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    circle: {
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.4,
        height: Dimensions.get('window').width * 0.4,
        backgroundColor:'#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        left: 100,
        top: 25,
        position: "absolute",
        opacity: 1.0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    cctext: {
        color: "#4BCF14",
        fontSize: 24,
        fontFamily: "prompt",
    },
    bgImage: {
        width: "100%",
        height: 200,
        justifyContent: "flex-end",
        opacity: 0.5,
    },
    container: {
        margin: 10,
    },
    bt1: {
        marginTop: 20,
        width: 300,
        top: 20,
        height: 60,
        left: 30,
        justifyContent: "center",
        backgroundColor: "#4BCF14",
        borderRadius: 10,
    },
    bt2: {
        width: 300,
        marginTop: 20,
        top: 20,
        height: 60,
        left: 30,
        justifyContent: "center",
        backgroundColor: "#BC3B19",
        borderRadius: 10,
    },
    bt3: {
        width: 300,
        top: 20,
        marginTop: 20,
        height: 60,
        left: 30,
        justifyContent: "center",
        backgroundColor: "#FFC300",
        borderRadius: 10,
    },
    text1: {
        color: "white",
        // justifyContent: "center",
        left: 10,
        fontSize: 24,
        fontFamily: "prompt",
        position: "absolute"
    },
    text2: {
        color: "white",
        // justifyContent: "center",
        left: 70,
        fontFamily: "prompt",
        fontSize: 26,
        position: "absolute"
    },
    text3: {
        color: "white",
        // justifyContent: "center",
        left: 80,
        fontSize: 26,
        position: "absolute",
        fontFamily: "prompt",
    },
    text: {
        color: "grey",
        // justifyContent: "center",
        // left: 85,
        fontSize: 26,
        fontFamily: "prompt",
        // position: "absolute"
    }
});

export default ManageQueueitem;
