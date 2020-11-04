import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ScanQrCode = (props) => {
    return (
        <View>
            <Text>Scan QR Code Screen</Text>
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

export default ScanQrCode;