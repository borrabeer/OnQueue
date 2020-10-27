import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Platform,
  FlatList,
} from "react-native";
import { CATEGORIES, MEALS } from "../data/dummy-data";

const CategoryMealsScreen = (props) => {
  const renderMealItem = (itemData) => {
    return (
      // <MealItem
      //   title={..เขียนโค้ดเพิ่ม..}
      //   duration={..เขียนโค้ดเพิ่ม..}
      //   complexity={..เขียนโค้ดเพิ่ม..}
      //   affordability={..เขียนโค้ดเพิ่ม..}
      //   image={..เขียนโค้ดเพิ่ม..}
      //   onSelectMeal={() => {
      //     // เขียนโค้ดเพิ่ม
      //   }}
      // />

      // ส่วนนี้ <View>...</View>ใช้เพื่อการทดลอง และให้คอมเมนต์เมื่อเรียกใช้ <MealItem>
      <View style={{ height: 50, width: "40%" }}>
        <Text>{itemData.item.title}</Text>
      </View>
    );
  };

  // const catId = ...รับข้อมูล id ของประเภทอาหาร...

  // const displayedMeals = MEALS.filter(
  //   (meal) => meal.categoryIds.indexOf(catId) >= 0
  // );

  return (
    // <View style={styles.screen}>
    //   <FlatList
    //     style={{ width: "100%" }}
    //     data={...เขียนโค้ดเพิ่ม...}
    //     renderItem={...เขียนโค้ดเพิ่ม...}
    //   />
    // </View>

    // ส่วนนี้ <View>...</View>ใช้เพื่อการทดลอง และให้คอมเมนต์เมื่อใช้ <FlatList>
    <View>
      <Text>Category Meals Screen!!</Text>
    </View>
  );
};

// CategoryMealsScreen.navigationOptions = (navigationData) => {
//   const catId = ...รับข้อมูล id ของประเภทอาหาร...

//   const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);
//   console.log("selectedCategory: ", selectedCategory);

//   return {
//     headerTitle: ...ชื่อประเภทอาหาร...,
//   };
// };

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CategoryMealsScreen;
