import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Platform,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import ShopList from "../components/ShopList";
import { useDispatch, useSelector } from "react-redux";
import { SearchBar } from "react-native-elements";
import { getShops, setLoading, getServices } from '../store/actions/servicesAction';

const ShopScreen = (props) => {
  const isLoading = useSelector(state => state.services.isLoading);
  const [search, setSearch] = useState("");
  const category_id = props.navigation.getParam("category_id");
  const availableShops = useSelector(state => state.services.shops);
  const dispatch = useDispatch();
  const getShopsHandler = (category_id) => {
    dispatch(getShops(category_id))
  }
  const setLoadingHandler = (bool) => {
    dispatch(setLoading(bool))
  }
  useEffect(() => {
    setLoadingHandler(true);
    getShopsHandler(category_id);
  }, []);
  const filteredContracts = React.useMemo(() => {
    return availableShops.filter(availableShop => availableShop.name.includes(search));
  }, [availableShops, search]);
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  return (
    <View style={styles.screen}>
      <SearchBar style={{height: 30}}
        round
        lightTheme
        containerStyle={{ width: "95%", backgroundColor: "white", borderRadius: 5 }}
        placeholder="ค้นหาที่นี่. . ."
        onChangeText={(text) => {
          setSearch(text)
        }}
        value={search} />
      <ShopList
        listData={filteredContracts}
        navigation={props.navigation}
        keyExtractor={(_, index) => index.toString()} />
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
    margin: 5,
    backgroundColor: "#FFFFFF",
  },
});

export default ShopScreen;
