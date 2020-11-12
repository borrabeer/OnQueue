import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import LoginScreen from "./LoginScreen";
import UserManagement from "./UserManagement";

const UserService = (props) => {
    const isLoading = useSelector(state => state.services.isLoading);
    const isLogin = useSelector(state => state.services.isLogin);
    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        )
    }
    if (isLogin) {
        return <UserManagement />
    } else {
        return <LoginScreen />
    }
}

const styles = StyleSheet.create({
})

export default UserService;