import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import ShopItem from "./ShopItem";
import NavigationService from "../NavigationService";

const ShopList = (props) => {
  const renderShopItem = (itemData) => {
    return (
      <ShopItem
        name={itemData.item.name}
        branch={itemData.item.branch}
        icon_url={itemData.item.icon_url}
        onSelectShop={() => {
          NavigationService.navigate("serviceScreen", {
            shop_id: itemData.item.id,
            shop_name: itemData.item.name,
            shop_image: itemData.item.icon_url
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