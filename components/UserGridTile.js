import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, Image, Dimensions, TouchableHighlight } from "react-native";

const UserGridTile = (props) => {
    return (
        
        <TouchableOpacity
            style={styles.gridItem}
            onPress={() => {
                props.onPress(props.id);
            }}
        >

            <View
                style={{ ...styles.container, ...{ backgroundColor: "#ffffff" } }}
            >

                <View style={styles.bgContainer}>
                    <Image source={{ uri: props.image }} style={styles.bgImage}></Image>
                </View>
                <Text style={styles.title} numberOfLines={2}>
                    {props.title}
                </Text>
            </View>

        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    
    gridItem: {
        flex: 1,
        margin: 10,
        height: 170,
    },
    container: {

        flex: 1,
        borderRadius: 10,
        shadowColor: "black",
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 3,
        padding: 15,
        justifyContent: "flex-end",
        marginTop: 30,
    },
    title: {
        fontSize: 16,
        textAlign: "center",
        fontFamily: "Prompt_400Regular"
    },
    bgContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    bgImage: {
        width: 70,
        height: 70,
    },
});

export default UserGridTile;