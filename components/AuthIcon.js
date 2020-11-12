import React from "react";
import { FlatList, View, StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux";
import { Ionicons, AntDesign, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

const AuthIcon = (props) => {
    const isLogin = useSelector(state => state.services.isLogin);
    const userData = useSelector(state => state.services.userData);
    if (isLogin) {
        return <Image source={{ uri: userData.image }} style={{ width: props.size, height: props.size }} />
    } else {
        return <AntDesign name="user" size={props.size} color={props.color} />
    } 
}

export default AuthIcon;