import React from "react";
import { FlatList, View, StyleSheet, Alert } from "react-native";
import ShopItem from "./ShopItem";
import NavigationService from "../NavigationService";
import Moment from 'moment';

const ShopList = (props) => {
  const renderShopItem = (itemData) => {
    Moment.locale('en');
    //  var dt = props.open_time;
    var now = Moment().format('LLL');
    var now2 = new Date();
    //  var now2 = Moment("2016-05-02T09:00:01", "h:mm:ss").format('a h:mm:ss');
    var openshop = Moment(itemData.item.open_time, "h:mm:ss").format('LLL');
    var closeshop = Moment(itemData.item.close_time, "h:mm:ss").format('LLL');
    var date1 = new Date(openshop);
    var date2 = new Date(closeshop);
    return (
      <ShopItem
        name={itemData.item.name}
        branch={itemData.item.branch}
        icon_url={itemData.item.icon_url}
        open_time={itemData.item.open_time}
        close_time={itemData.item.close_time}
        onSelectShop={() => {
          if (now2 > date1 && now2 < date2) {
            NavigationService.navigate("serviceScreen", {
              shop_id: itemData.item.id,
              shop_name: itemData.item.name,
              shop_image: itemData.item.icon_url
            })
          } else {
            Alert.alert("Oops!", "ยังไม่ถึงเวลาเปิดให้บริการ !")
          }
        }} />
    )
  }

  return (
    <View style={styles.screen} >
      <FlatList
        style={{ width: "100%", backgroundColor: "#FFFFFF" }}
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