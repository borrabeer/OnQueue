import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Moment from 'moment';

const ShopItem = (props) => {
     var date = new Date(props.open_time);
     Moment.locale('en');
    //  var dt = props.open_time;
     var now = Moment().format('LLL');
     var now2 = new Date();
    //  var now2 = Moment("2016-05-02T09:00:01", "h:mm:ss").format('a h:mm:ss');
     var openshop = Moment( props.open_time, "h:mm:ss").format('LLL');
     var closeshop = Moment(props.close_time , "h:mm:ss").format('LLL');
     var date1 = new Date(openshop);
     var date2 = new Date(closeshop);
    //  console.log(openshop)
    // console.log( Moment( props.open_time, "h:mm:ss a").isBefore(props.close_time , "h:mm:ss a"))

    // console.log(now2.getTime() > date2.getTime())
    // console.log(openshop)
    // console.log(closeshop)
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
                            <View style={styles.row}>
                                <View style={{ ...styles.titleContainer, width: "100%" }} >
                                    <Text style={styles.title} numberOfLines={1}>
                                    {props.name}
                                    </Text>
                                    <View style={{ paddingHorizontal: 1, }}>
                                        <Text style={styles.branch} numberOfLines={1}>
                                            {props.branch}
                                        </Text>
                                        {now2 > date1 && now2 < date2 ? <Image
                                        source={{ uri: "https://www.clipartsfree.net/vector/medium/49491-small-green-dot-images.png" }}
                                        style={styles.iconImage}
                                        />: <Image
                                        source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Basic_red_dot.png" }}
                                        style={styles.iconImage}
                                        /> }
                                    
                                        {/* {renderElement} */}
                                    </View>
                                </View>
                                <View>
                                
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
        width: "95%",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        margin: 10,
    },
    shopItem: {
        flex: 1,
        height: 230,
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 25,   
        overflow: "hidden",
    },
    shopCol: {
        flexDirection: "column",
    },
    shopHeader: {
        height: "85%"
    },
    bgImage: {
        flex:1,
        width: "100%",
        height: "100%",
        justifyContent: "flex-end"
    },
    bgContainer: {
        
        width: "100%",
        height: 165,
        justifyContent: "center",
        alignItems: "center",
    },
    titleContainer: {
        
        // backgroundColor: "white",
        justifyContent: "flex-end",
        paddingVertical: 5,
        paddingHorizontal: 12,
        // สีกรอบข้อความ
        backgroundColor: "#edefee",
        
    },
    title: {
        fontFamily: "Prompt_700Bold",
        fontSize: 20,
        color: "#524E4E",
    },
    branch: {
        fontFamily: "Prompt_400Regular",
        fontSize: 17,
        
        color: "#524E4E",
    },
    iconImage:{
        width: 20,
        height: 20,
        right: 30,
        top: -15,
        // justifyContent: "flex-end",
        position: "absolute",
    },
})

export default ShopItem;