import React from "react";
import { Text } from "react-native";
import { useSelector } from "react-redux";

const AuthTitle = (props) => {
    const isLogin = useSelector(state => state.services.isLogin);
    const userData = useSelector(state => state.services.userData);
    if (isLogin) {
        return <Text style={{ color: props.color, fontFamily: "Prompt_400Regular", fontSize: 11, marginBottom: 2 }}>{userData.user.first_name}</Text>
    } else {
        return <Text style={{ color: props.color, fontFamily: "Prompt_400Regular", fontSize: 11, marginBottom: 2 }}>ล็อคอิน</Text>
    } 
}

export default AuthTitle;