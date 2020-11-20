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
import { setLoading, getEditShop } from "../store/actions/servicesAction";

const ManageService = (props) => {
  const isLoading = useSelector(state => state.services.isLoading);
  const userToken = useSelector(state => state.services.userToken);
  const availableServices = useSelector(state => state.services.manageServices);
  const dispatch = useDispatch();
  const setLoadingHandler = (bool) => {
    dispatch(setLoading(bool))
  }
  const getEditShopHandler = (token, id) => {
    dispatch(getEditShop(token, id));
  }
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  const renderServiceItem = (itemData) => {
    return (

      <LocationItem
        data={itemData.item.shop}
        onEdit={() => {
          // setLoadingHandler(true);
          // getEditShopHandler(userToken, itemData.item.shop.id);
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
      <FlatList data={availableServices} renderItem={renderServiceItem} numColumns={1} />

      <TouchableOpacity style={styles.bt} onPress={() => {
        // NavigationService.navigate("locationScreen")
      }}>
        <Text style={styles.text} >
          เพิ่มบริการ
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

export default ManageService;