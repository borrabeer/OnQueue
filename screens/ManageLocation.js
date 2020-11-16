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
import { getManageShops, setLoading } from "../store/actions/servicesAction";

const ManageLocation = (props) => {
  const isLoading = useSelector(state => state.services.isLoading);
  const userToken = useSelector(state => state.services.userToken);
  const availableShops = useSelector(state => state.services.manageShops);
  const dispatch = useDispatch();
  const getManageShopsHandler = (token) => {
    dispatch(getManageShops(token))
  }
  const setLoadingHandler = (bool) => {
    dispatch(setLoading(bool))
  }
  useEffect(() => {
    setLoadingHandler(true);
    getManageShopsHandler(userToken);
  }, []);
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

      <TouchableOpacity style={styles.bt} onPress={() => NavigationService.navigate("locationScreen")}>
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