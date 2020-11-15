import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert, ActivityIndicator, Image, ImageBackground } from "react-native";
import * as Facebook from "expo-facebook";
import { getUserData, setLoading, getUserToken } from "../store/actions/servicesAction";
import { useSelector, useDispatch } from "react-redux";

const LoginScreen = (props) => {
    const isLoading = useSelector(state => state.services.isLoading);
    const dispatch = useDispatch();
    const getUserDataHandler = (id, email, name, image) => {
        dispatch(getUserData(id, email, name, image));
        dispatch(setLoading(true));
        setTimeout(() => {
            getUserTokenHandler(id);
        }, 1000);
    }
    const getUserTokenHandler = (id) => {
        dispatch(getUserToken(id));
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
                        getUserDataHandler(data.id, data.email, data.name, data.picture.data.url);
                    })
                    .catch((e) => console.log(e));
            } else {
                // type === 'cancel'
            }
        } catch ({ message }) {
            Alert.alert(`Facebook Login Error: ${message}`);
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
        <View style={styles.container}>
            <ImageBackground source={require('../assets/bg2.jpeg')} style={styles.backgroundImage} blurRadius={5}>

                <Image source={require('../assets/white_1-02-01.png')} style={styles.bgImage} />
                <TouchableOpacity style={styles.bt1}>
                    <Image source={{ uri: 'https://icon-library.com/images/facebook-icon-png-white/facebook-icon-png-white-19.jpg' }} style={styles.logo} />
                    <Text style={styles.text1} onPress={logIn} >
                        Login with Facebook
                    </Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    bgImage: {
        width: 300,
        height: 200,
        left: 55,
        top: 150,
        // justifyContent: "flex-end",
        position: "absolute",
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        // justifyContent: "stretch",
        // resizeMode: 'stretch', // or 'stretch'
    },
    logo: {
        width: 40,
        height: 40,
        left: 20,
        justifyContent: "flex-start",
    },
    bt1: {
        marginTop: 20,
        width: 300,
        top: 400,
        height: 60,
        left: 60,
        justifyContent: "center",
        backgroundColor: "#3B5998",
        borderRadius: 5,
    },
    text1: {
        color: "white",
        // justifyContent: "center",
        left: 80,
        fontSize: 18,
        fontFamily: "Prompt_400Regular",
        position: "absolute"
    },
    container: {
        flex: 1,
        flexDirection: "column",
        // margin: 10
    }
})

export default LoginScreen;