// import คอมโพเนนต์ที่จำเป็น
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryServicesScreen from "../screens/CategoryServicesScreen";

const ServicesNavigator = createStackNavigator(
  {
    categories: CategoriesScreen,
    categoryService: CategoryServicesScreen
  },
  {
    defaultNavigationOptions: {
      headerStyle: { backgroundColor: "#3671D6"},
      headerTintColor: "white"
    }

  }
);

export default createAppContainer(ServicesNavigator);
