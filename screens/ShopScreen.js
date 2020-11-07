import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Platform,
  FlatList,
} from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import ShopList from "../components/ShopList";
import { useDispatch, useSelector } from "react-redux";
import { SearchBar } from "react-native-elements";
import { getShops } from '../store/actions/servicesAction'

const ShopScreen = (props) => {
  const [search, setSearch] = useState("");
  const category_id = props.navigation.getParam("category_id");
  const availableShops = useSelector(state => state.services.shops);
  const dispatch = useDispatch();
  const getShopsHandler = (category_id) => {
    dispatch(getShops(category_id))
  }
  useEffect(() => {
    getShopsHandler(category_id);
  }, []);
  return (
    <View style={styles.screen}>
      <SearchBar
        round
        lightTheme
        containerStyle={{ width: 343, backgroundColor: "white", borderRadius: 21 }}
        placeholder="ค้นหาที่นี่. . ."
        onChangeText={(text) => {
          setSearch(text)
        }}
        value={search} />
      <ShopList
        listData={availableShops}
        navigation={props.navigation} />
    </View>
  );
};

ShopScreen.navigationOptions = (navigationData) => {
  const category_name = navigationData.navigation.getParam("category_name");
  return {
    headerTitle: category_name
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 5
  },
});

export default ShopScreen;
