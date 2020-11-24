import React, { useState } from "react";
import {
    View,
    Text,
    Button,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Platform, TextInput,
    ActivityIndicator
} from "react-native";
import { Food } from "../data/dummy-data";
import ManagerList from "../components/ManagerList";
import { useDispatch, useSelector } from "react-redux";
import { createShopManager, setLoading, deleteShopManager } from "../store/actions/servicesAction";

const ManagerListScreen = (props) => {
    const isLoading = useSelector(state => state.services.isLoading);
    const userToken = useSelector(state => state.services.userToken);
    const managers = useSelector(state => state.services.managers);
    const shop_id = props.navigation.getParam("shop_id");
    console.log(shop_id);
    const [email, setEmail] = useState(null);
    const dispatch = useDispatch();
    const setLoadingHandler = (bool) => {
        dispatch(setLoading(bool))
    }
    const createShopManagerHandler = () => {
        dispatch(createShopManager(userToken, shop_id, email))
    }
    const deleteShopManagerHandler = (token, id, email) => {
        dispatch(deleteShopManager(token, id, email))
    }
    const renderManagerItem = (itemData) => {
        return (
            <ManagerList data={itemData.item} onDelete={() => {
                setLoadingHandler(true);
                deleteShopManagerHandler(userToken, shop_id, itemData.item.user.user.email);
            }} />
        )
    }
    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        )
    }
    return (
        <View>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: "#FFFFFF", width: "70%", margin: 20, borderRadius: 5 }}
                onChangeText={text => setEmail(text)}
                value={email}
                placeholder="ใส่ email"
            />
            <TouchableOpacity style={styles.bt2} onPress={() => {
                setLoadingHandler(true);
                createShopManagerHandler();
            }}>
                <Text style={styles.text3}>เพิ่ม</Text>
            </TouchableOpacity>
            <FlatList data={managers} renderItem={renderManagerItem} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    bt2: {
        //   flex: 3,
        top: 20,
        left: 320,
        width: 60,
        height: 40,
        backgroundColor: "#206CD5",
        borderRadius: 10,
        // justifyContent: "flex-end",
        position: "absolute",
        // left: 10,
    },
    text3: {
        color: "white",
        top: 10,
        fontFamily: "Prompt_400Regular",
        fontSize: 16,
        position: "relative",
        left: 15,
    }
})

export default ManagerListScreen;