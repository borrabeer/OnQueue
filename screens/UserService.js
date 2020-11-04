import React from "react";
import { StyleSheet, Text, View } from "react-native";

const UserService = (props) => {
    return (
        <View>
            <Text>User Service Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})

export default UserService;