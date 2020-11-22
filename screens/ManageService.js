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
import ServiceItem from "../components/ServiceItem";
import NavigationService from "../NavigationService";
import { setLoading, getEditService } from "../store/actions/servicesAction";

const ManageService = (props) => {
  const isLoading = useSelector(state => state.services.isLoading);
  const userToken = useSelector(state => state.services.userToken);
  const availableServices = useSelector(state => state.services.manageServices);
  const shop_id = props.navigation.getParam("shop_id");
  const dispatch = useDispatch();
  const setLoadingHandler = (bool) => {
    dispatch(setLoading(bool))
  }
  const getEditServiceHandler = (token, id) => {
    dispatch(getEditService(token, id));
  }
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  const renderServiceItem = (itemData) => {
    console.log(itemData.item);
    return (

      <ServiceItem
        data={itemData.item}
        onEdit={() => {
          setLoadingHandler(true);
          getEditServiceHandler(userToken, itemData.item.id);
        }}
      />
    )
  }
  return (

    <View style={styles.screen}>
      {/* <SearchBar style={{ height: 30 }}
        round
        lightTheme
        placeholder="Type Here..."
        containerStyle={{ width: "95%", backgroundColor: "#FFFFFF", borderRadius: 5 }}

      // onChangeText={this.updateSearch}
      // value={search}
      />
       */}
      <ScrollView>
        <View style={styles.screen}>
          <FlatList data={availableServices} renderItem={renderServiceItem} numColumns={1} />

          <TouchableOpacity style={styles.bt} onPress={() => {
            NavigationService.navigate("serviceDetail", {
              shop_id: shop_id
            })
          }}>
            <Text style={styles.text} >
              เพิ่มบริการ
        </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bt: {
    margin: 15,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    padding: 3,
    width: "60%",
    height: 60,
    justifyContent: "center",
    backgroundColor: "#2E64FE",
    width: 320,
    position: "absolute",
    top: 600
  },
  text: {
    color: "white",
    // justifyContent: "center",
    fontSize: 26,
    textAlign: "center",
    fontFamily: "Prompt_400Regular"
  }
})

export default ManageService;