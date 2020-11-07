import React, { useEffect } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import CategoryGridTile from "../components/CategoryGridTile";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from '../store/actions/servicesAction'

const CategoriesScreen = (props) => {
  const availableCategories = useSelector(state => state.services.categories);
  const dispatch = useDispatch();
  const getCategoriesHandler = () => {
    dispatch(getCategories())
  }
  useEffect(() => {
    getCategoriesHandler();
  }, []);
  const renderGridItem = (itemData) => {
    return (
      <CategoryGridTile
        title={itemData.item.name}
        image={itemData.item.icon_url}
        onSelect={() => {
          props.navigation.navigate("shopScreen", {
            category_id: itemData.item.id,
            category_name: itemData.item.name
          })
        }}
      />
    );
  };

  return (
    <View style={styles.screen}>
      <View style={[styles.viewCenter]}>
        <Text style={[styles.fontBold, { fontSize: 22 }]}>ยินดีต้อนรับสู่แอพพลิเคชั่น OnQueue</Text>
        <Text style={[styles.fontBold, { fontSize: 18 }]}>กรุณาเลือกหมวดหมู่ที่ต้องการใช้บริการ</Text>
      </View>
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
