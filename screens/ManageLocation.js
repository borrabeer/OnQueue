import React, { useEffect } from "react";
import {
  View,
  Text,

  FlatList,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SearchBar } from 'react-native-elements'
import { useDispatch, useSelector } from "react-redux";
import LocationItem from "../components/LocationItem";
import NavigationService from "../NavigationService";
import { setLoading, getEditShop, getManageServices, getManageShopItem } from "../store/actions/servicesAction";

const ManageLocation = (props) => {
  const isLoading = useSelector(state => state.services.isLoading);
  const userToken = useSelector(state => state.services.userToken);
  const availableShops = useSelector(state => state.services.manageShops);
  const dispatch = useDispatch();
  const setLoadingHandler = (bool) => {
    dispatch(setLoading(bool))
  }
  const getEditShopHandler = (token, id) => {
    dispatch(getEditShop(token, id));
  }
  const getManageServicesHandler = (token, id) => {
    dispatch(getManageServices(token, id));
  }
  const getManageShopItemHandler = (token, id) => {
    dispatch(getManageShopItem(token, id));
  }
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  const renderLocationItem = (itemData) => {
    return (

      <LocationItem
        data={itemData.item.shop}
        onEdit={() => {
          setLoadingHandler(true);
          getEditShopHandler(userToken, itemData.item.shop.id);
        }}
        onManage={() => {
          setLoadingHandler(true);
          getManageServicesHandler(userToken, itemData.item.shop.id);
        }}
        onSelect={() => {
          setLoadingHandler(true);
          getManageShopItemHandler(userToken, itemData.item.shop.id);
        }}
      />
    )
  }
  return (
    <ScrollView>
      <SearchBar
        lightTheme
        placeholder="Type Here..."
      // onChangeText={this.updateSearch}
      // value={search}
      />
      <FlatList data={availableShops} renderItem={renderLocationItem} numColumns={1} />

      <TouchableOpacity style={styles.bt} onPress={() => {
        NavigationService.navigate("locationScreen")
      }}>
        <Text style={styles.text} >
          เพิ่มสถานที่
        </Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bt: {
    width: 300,
    height: 80,
    left: 40,
    justifyContent: "center",
    backgroundColor: "#2E64FE",
  },
  text: {
    color: "white",
    // justifyContent: "center",
    left: 85,
    fontSize: 26,
    position: "absolute",
    fontFamily: "Prompt_400Regular"
  }
})

export default ManageLocation;