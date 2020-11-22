import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from "react-native";
import CategoryGridTile from "../components/CategoryGridTile";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, setLoading, validateUserToken } from '../store/actions/servicesAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationService from "../NavigationService";

const CategoriesScreen = (props) => {
  const isLoading = useSelector(state => state.services.isLoading);
  const availableCategories = useSelector(state => state.services.categories);
  const dispatch = useDispatch();
  const getCategoriesHandler = () => {
    dispatch(getCategories())
  }
  const setLoadingHandler = (bool) => {
    dispatch(setLoading(bool))
  }
  const checkLogin = async () => {
    var token = await AsyncStorage.getItem("@OnQueue_Token");
    token != null ? validateUserTokenHandler(JSON.parse(token)) : console.log("token not found");
  }
  const validateUserTokenHandler = (token) => {
    dispatch(validateUserToken(token))
  }
  useEffect(() => {
    checkLogin();
    setLoadingHandler(true);
    getCategoriesHandler();
  }, []);
  const renderGridItem = (itemData) => {
    return (
      <CategoryGridTile
        title={itemData.item.name}
        image={itemData.item.icon_url}
        onSelect={() => {
          NavigationService.navigate("shopScreen", {
            category_id: itemData.item.id,
            category_name: itemData.item.name
          })
        }}
      />
    );
  };
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  return (
    <View style={styles.screen}>
      <View style={[styles.viewCenter]}>
        <Text style={[styles.fontBold, { fontSize: 22 }]}>ยินดีต้อนรับสู่แอพพลิเคชั่น OnQueue</Text>
        <Text style={[styles.fontBold, { fontSize: 18 }]}>กรุณาเลือกหมวดหมู่ที่ต้องการใช้บริการ</Text>
      </View>
      <View style={{ flex:1.5}} ></View>
      <FlatList data={availableCategories} renderItem={renderGridItem} numColumns={2} />
    </View>
  );
};


CategoriesScreen.navigationOptions = {
  headerTitle: "OnQueue",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  viewCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  fontBold: {
    fontWeight: "bold",
    fontFamily: "Prompt_700Bold",
    color: "#515151",
  }
});

export default CategoriesScreen;
