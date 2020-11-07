import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ShopItem = (props) => {
    return (
        <View style={styles.screen} >
            <View style={styles.shopItem}>
                <TouchableOpacity onPress={props.onSelectShop}>
                    <View>
                        <View style={{ ...styles.shopCol, ...styles.shopHeader }} >
                            <View style={styles.bgContainer} >
                                <Image
                                    source={{ uri: props.icon_url }}
                                    style={styles.bgImage}
                                />
                            </View>

                            <View style={{ ...styles.titleContainer, width: "100%" }} >
                                <Text style={styles.title} numberOfLines={1}>
                                    {props.name}
                                </Text>
                                <View style={{ paddingHorizontal: 10, }}>
                                    <Text style={styles.branch} numberOfLines={1}>
                                        {props.branch}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    shopItem: {
        height: 233,
        width: 313,
        backgroundColor: "white",
        borderRadius: 7,
        overflow: "hidden",
    },
    shopCol: {
        flexDirection: "column"
    },
    shopHeader: {
        height: "85%"
    },
    bgImage: {
        width: "100%",
        height: "100%",
        justifyContent: "flex-end"
    },
    bgContainer: {
        width: 313,
        height: 150,
        justifyContent: "center",
        alignItems: "center",
    },
    titleContainer: {
        // backgroundColor: "white",
        justifyContent: "flex-end",
        paddingVertical: 5,
        paddingHorizontal: 12
    },
    title: {
        fontFamily: "Prompt_700Bold",
        fontSize: 22,
        color: "#524E4E",
    },
    branch: {
        fontFamily: "Prompt_400Regular",
        fontSize: 18,
        color: "#524E4E",
    },
})

export default ShopItem;