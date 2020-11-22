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
        open_time={itemData.item.open_time}
        close_time={itemData.item.close_time}
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
        style={{ width: "100%",backgroundColor: "#FFFFFF"  }}
        data={props.listData}
        renderItem={renderShopItem}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    width: "95%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
});

export default ShopList;