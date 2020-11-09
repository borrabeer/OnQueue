import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import * as Facebook from "expo-facebook";
import { getUserData, setLoading, getUserToken } from "../store/actions/servicesAction";
import { useSelector, useDispatch } from "react-redux";

const UserService = (props) => {
    const isLoading = useSelector(state => state.services.isLoading);
    const isLogin = useSelector(state => state.services.isLogin);
    const userData = useSelector(state => state.services.userData);
    const dispatch = useDispatch();
    const getUserDataHandler = (id, email) => {
        dispatch(getUserData(id, email));
        dispatch(setLoading(true));
        getUserTokenHandler(id, email);
    }
    const getUserTokenHandler = (id, email) => {
        dispatch(getUserToken(id, email));
        dispatch(setLoading(true));
    }
    const logIn = async () => {
        try {
            await Facebook.initializeAsync({
                appId: '757262681521916',
            });
            const {
                type,
                token,
                expirationDate,
                permissions,
                declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile', "email"],
            });
            if (type === 'success') {
                // Get the user's name using Facebook's Graph API
                fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`)
                    .then((response) => response.json())
                    .then((data) => {
                        Alert.alert('Logged in!', `Hi ${data.name}!`);
                        getUserDataHandler(data.id, data.email);
                    })
                    .catch((e) => console.log(e));
            } else {
                // type === 'cancel'
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }
    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        )
    }
    return (
        <View style={styles.screen}>
            <TouchableOpacity onPress={logIn} >
                {isLogin ? <Text>{userData ? userData.email : "Login"}</Text> : <Text>Login with Facebook</Text>}
            </TouchableOpacity>
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