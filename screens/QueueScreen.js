import React from "react";
import {
    View,
    Text,
    Button,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Image,
} from "react-native";
import QueueGridTile from "../components/QueueGridTile";


const QueueScreen = (props) => {
    const renderGridItem = (itemData) => {
        return (
            <QueueGridTile
                title={itemData.item.title}
                detail={itemData.item.detail}

            />
        );
    };
    return (
        <View style={styles.screen}>
            <View style={{
                flex: 1,
                margin: 20,
                height: 200,
                borderRadius: 10,
                shadowColor: "black",
                shadowOpacity: 0.26,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 10,
                elevation: 3,
                padding: 3,
                justifyContent: "flex-end",
                backgroundColor: "#ffffff"
            }}>
                {/* <FlatList data={DETAIL} renderItem={renderGridItem}  /> */}
                <View style={{alignItems: "center"}}>
                <Image source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Circle-icons-hourglass.svg/1200px-Circle-icons-hourglass.svg.png'}}
                style={{ ...styles.logo}} />
                </View>
                <View style={{ ...styles.container1}}>
                <Text style={[styles.fontBold, { fontSize: 50, color: "#ffffff" }]}>ยกเลิก</Text>
                </View>
            </View>
        </View>
    );
};
QueueScreen.navigationOptions = {
    headerTitle: "OnQueue",
};

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 10,
        height: 50,
    },
    screen: {
        flex: 1,
    },
    logo: {
        
        alignItems: "center",
        width: 150,
        height: 150,
    },
    viewCenter: {
        justifyContent: "center",
        alignItems: "center",
    },
    fontBold: {
        
        fontWeight: "bold",
        fontFamily: "Prompt_400Regular",
        textAlign: "center",
    },
    
    container1:{
        
        margin: 15,
        borderRadius: 10,
        shadowColor: "black",
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 3,
        padding: 3,
        justifyContent: "flex-end",
        backgroundColor: "#808080",
        height: 80,
    },
});

export default QueueScreen;