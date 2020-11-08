import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import ShopItem from "./ShopItem";

const ShopList = (props) => {
  const renderShopItem = (itemData) => {
    return (
      <ShopItem
        name={itemData.item.name}
        branch={itemData.item.branch}
        icon_url={itemData.item.icon_url}
        onSelectShop={() => {
          props.navigation.navigate("serviceScreen", {
            shop_id: itemData.item.id,
            shop_name: itemData.item.name
          })
        }} />
    )
  }

  return (
    <View style={styles.screen} >
      <FlatList
        style={{ width: "100%" }}
        data={props.listData}
        renderItem={renderShopItem}
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

export default ShopList;