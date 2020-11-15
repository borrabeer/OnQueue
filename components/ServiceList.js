import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import ServiceItem from "./ServiceItem";
import NavigationService from '../NavigationService';

const ServiceList = (props) => {
    const renderServiceItem = (itemData) => {
        return (
            <ServiceItem
                name={itemData.item.name}
                branch={itemData.item.branch}
                image={itemData.item.image}
                onSelectShop={() => {
                    NavigationService.navigate("serviceScreen"), {
                        id: itemData.item.id,
                    }
                }} />
        )
    }

    return (
        <View style={styles.screen} >
            <FlatList
                style={{ width: "100%" }}
                data={props.listData}
                renderItem={renderServiceItem}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default ServiceList;