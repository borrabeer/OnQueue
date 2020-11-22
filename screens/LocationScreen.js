import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Switch,
  Button,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  Dimensions,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import DateTimePickerIOS from "../components/DateTimePickerIOS";
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import { createShop, setLoading } from "../store/actions/servicesAction";

const LocationScreen = (props) => {
  const dispatch = useDispatch();
  const setLoadingHandler = (bool) => {
    dispatch(setLoading(bool));
  }
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);
  const [shopName, setShopName] = useState(null);
  const [branchName, setBranchName] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [showOpen, setShowOpen] = useState(false);
  const [showClose, setShowClose] = useState(false);
  const [openTime, setOpenTime] = useState(new Date());
  const [closeTime, setCloseTime] = useState(new Date());
  const [image, setImage] = useState(null);
  const isLoading = useSelector(state => state.services.isLoading);
  const availableCategories = useSelector(state => state.services.categories);
  const userToken = useSelector(state => state.services.userToken);
  const categoriesData = [];
  for (let index = 0; index < availableCategories.length; index++) {
    const element = {
      label: availableCategories[index].name,
      value: availableCategories[index].id,
    };
    categoriesData.push(element);
  }
  const [category, setCategory] = useState(categoriesData ? categoriesData[0].value : null);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const formatDate = (time) => {
    return `${time.getHours()}:${time.getMinutes()}`;
  };
  const createShopHandler = () => {
    if (category === null) {
      Alert.alert("Information", "กรุณาเลือกประเภทของร้าน")
    }
    else if (shopName === null || shopName === "" || shopName === " ") {
      Alert.alert("Information", "กรุณาใส่ชื่อร้าน")
    }
    else if (branchName === null || branchName === "" || branchName === " ") {
      Alert.alert("Information", "กรุณาใส่ชื่อสาขา")
    }
    else if (openTime === null) {
      Alert.alert("Information", "กรุณาใส่เวลาเปิดร้าน")
    }
    else if (closeTime === null) {
      Alert.alert("Information", "กรุณาใส่เวลาปิดร้าน")
    }
    else if (image === null) {
      Alert.alert("Information", "กรุณาใส่เวลารูปภาพของร้าน")
    }
    else {
      setLoadingHandler(true);
      dispatch(createShop(userToken, {
        category_id: category,
        shop_name: shopName,
        branch_name: branchName,
        open_time: formatDate(openTime),
        close_time: formatDate(closeTime),
        status: isEnabled,
        image: image
      }))
    }
  }
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result);
    }
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
      <View
        style={{ ...styles.container, ...{ backgroundColor: "#F0F0F0", } }}
      ></View>

      <ScrollView style={{
        flex: 1,
        margin: 10,
        width: "95%",
        height: 200,
        borderRadius: 10,
        shadowColor: "black",
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 3,
        padding: 3,
        // justifyContent: "flex-end",
        backgroundColor: "#ffffff"

      }}>
        <Text style={{ ...styles.fontInput}}>   ประเภทของร้าน</Text>

        <DropDownPicker items={categoriesData}
          defaultValue={category}
          containerStyle={{ height: 40 }}
          onChangeItem={item => setCategory(item)} multiple={true}
          multipleText="%d items have been selected."
          style={{backgroundColor: '#fafafa',width: "95%", left: 8, }}
          min={0} />
        <Text style={{ ...styles.fontInput }}>   ชื่อร้าน</Text>
        <TextInput
          style={{ ...styles.input }}
          defaultValue={shopName}
          placeholder="กรุณาใส่ชื่อร้าน"
          onChangeText={text => setShopName(text)}
        />
        <Text style={{ ...styles.fontInput }}>   สาขา</Text>
        <TextInput
          style={{ ...styles.input }}
          defaultValue={branchName}
          placeholder="กรุณาใส่ชื่อสาขา"
          onChangeText={text => setBranchName(text)}
        />
        <Text style={{ ...styles.fontInput }}>   เวลาเปิด</Text>
        <TouchableOpacity style={{ ...styles.input }} onPress={() => {
          setShowOpen(true);
        }}><Text style={{ ...styles.fontTime }}>{formatDate(openTime)}</Text></TouchableOpacity>
        <Text style={{ ...styles.fontInput }}>   เวลาปิด</Text>
        <TouchableOpacity style={{ ...styles.input }} onPress={() => {
          setShowClose(true);
        }}><Text style={{ ...styles.fontTime }}>{formatDate(closeTime)}</Text></TouchableOpacity>
        <View style={{
          flex: 1,
          marginRight: 15,
          flexDirection: "row",
          justifyContent: "space-between",
        }}>


          <Text style={{ ...styles.fontInput,marginTop: 10,}}>   สถานะ</Text>
          <Switch style={{marginTop: 10,}}
            trackColor={{ false: "#ffffff", true: "#60c459" }}
            thumbColor={isEnabled ? "#ffffff" : "#ffffff"}
            ios_backgroundColor="#c25e5e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />

        </View>
        <Text style={{ ...styles.fontInput,marginTop: 10, }}>   รูปภาพ</Text>
        
        {image && <View style={{ justifyContent: "center", alignItems: "center" }}><Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} /></View>}
        <TouchableOpacity onPress={pickImage} style={{ ...styles.buttonImage }}>
          <Text style={[styles.fontButton, { fontSize: 25, color: "#ffffff" }]}>เลือกรูปภาพ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ ...styles.button }} onPress={createShopHandler}>
          <Text style={[styles.fontButton, { fontSize: 25, color: "#ffffff" }]}>{"ยืนยันข้อมูลสถานที่"}</Text>
        </TouchableOpacity>
      </ScrollView>
      {showOpen && (
        <DateTimePickerIOS
          date={openTime}
          onClose={(date) => {
            setShowOpen(false);
          }}
          onChange={(d) => {
            setOpenTime(d)
          }}
        />
      )}
      {showClose && (
        <DateTimePickerIOS
          date={closeTime}
          onClose={(date) => {
            setShowClose(false);
          }}
          onChange={(d) => {
            setCloseTime(d)
          }}
        />
      )}
    </View>
  );
};
LocationScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: "เพิ่มสถานที่",
  }
};


const styles = StyleSheet.create({

  buttonImage: {
    margin: 15,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    padding: 3,
    justifyContent: "flex-end",
    backgroundColor: "#44bcd8",
    height: 50,
    // position: 'absolute',
    width: 340,
  },
  button: {
    margin: 15,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    padding: 3,
    justifyContent: "flex-end",
    backgroundColor: "#64c460",
    height: 50,
    // position: 'absolute',
    width: 340,
  },
  fontButton: {
    fontWeight: "bold",
    fontFamily: "Prompt_400Regular",
    textAlign: "center",

  },
  fontInput: {
    marginTop:5,
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Prompt_400Regular",

  },
  fontTime: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
    fontFamily: "Prompt_400Regular",

  },
  container2: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
  mapStyle: {
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: 366,
    height: 265,
  },
  container2: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },


  input: {
    margin: 10,
    height: 50,
    borderRadius: 10,
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    padding: 3,
    justifyContent: "flex-end",
    backgroundColor: "#F0F0F0",
    color: 'black',
    fontFamily: "Prompt_400Regular"
  },
  inputTime: {
    margin: 10,
    height: 40,
    width: 120,
    borderRadius: 10,
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    padding: 3,
    justifyContent: "flex-end",
    backgroundColor: "#F0F0F0",
    color: '#bebebe'
  },
  input2: {
    margin: 10,
    height: 50,
    borderRadius: 10,
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    padding: 3,
    justifyContent: "flex-end",
    backgroundColor: "#F0F0F0",
    color: '#bebebe'
  },
  gridItem: {
    flex: 1,
    margin: 10,
    height: 50,
  },
  screen: {
    flex: 1,
  },
  logo: {

    alignItems: "center",
    width: 150,
    height: 150,
  },
  viewCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  fontBold: {
    
    fontWeight: "bold",
    fontFamily: "Prompt_400Regular",
    textAlign: "center",
  },

  container1: {

    margin: 15,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    padding: 3,
    justifyContent: "flex-end",
    backgroundColor: "#808080",
    height: 80,
  },
});

export default LocationScreen;