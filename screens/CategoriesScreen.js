import React from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import CategoryGridTile from "../components/CategoryGridTile";

const CategoriesScreen = (props) => {
  const renderGridItem = (itemData) => {
    return (
      <CategoryGridTile
        title={itemData.item.title}
        image={itemData.item.image}
        onSelect={() => {
          props.navigation.navigate("categoryService", { categoryId: itemData.item.id })
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
      <FlatList data={CATEGORIES} renderItem={renderGridItem} numColumns={2} />
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
    fontFamily: "Prompt_400Regular"
  }
});


export default CategoriesScreen;
