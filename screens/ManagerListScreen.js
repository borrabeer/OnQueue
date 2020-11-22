import React from "react";
import { View,
    Text,
    Button,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Platform, TextInput } from "react-native";
import { Food } from "../data/dummy-data";
import ManagerList from "../components/ManagerList";

const ManagerListScreen = (props) => {
    const renderHistory = (itemData) => {
        return (
            <ManagerList/>
        )
    }
    return (
        <View>
            <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: "#FFFFFF", width: "70%",  margin: 20, borderRadius: 5}}
            // onChangeText={text => onChangeText(text)}
            // value={value}
            placeholder="ใส่ email"
            />
            <TouchableOpacity style={styles.bt2} onPress={() => {
                props.onSelect();
            }}>
            <Text style={styles.text3}>เพิ่ม</Text>
            </TouchableOpacity>
            <ManagerList/>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    bt2: {
        //   flex: 3,
        top: 20,
        left: 290,
        width: 60,
        height: 40,
        backgroundColor: "#206CD5",
        borderRadius: 10,
        // justifyContent: "flex-end",
        position: "absolute",
        // left: 10,
      },
      text3: {
        color: "white",
        top: 10,
        fontFamily: "Prompt",
        fontSize: 16,
        position: "relative",
        left: 15,
    }
})

export default ManagerListScreen;