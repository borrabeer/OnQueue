import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Platform,
  FlatList,
} from "react-native";
import { CATEGORIES, SHOPS } from "../data/dummy-data";
import ShopList from "../components/ShopList";

const CategoryMealsScreen = (props) => {

  return (
    <View style={styles.screen}>
      <ShopList
        listData={SHOPS}
        navigation={props.navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CategoryMealsScreen;
