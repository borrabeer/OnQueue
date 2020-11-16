import React, { useState } from "react";
import { TouchableOpacity, Platform, Text, View, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { onChange } from "react-native-reanimated";

const DateTimePickerIOS = (props) => {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(props.date);
  return (
    <TouchableOpacity style={styles.tb1} onPress={props.onClose}>
      {Platform.OS === 'ios' && (
        <View style={styles.view1}>
          <TouchableOpacity>
            <Text>Done</Text>
          </TouchableOpacity>
        </View>
      )}
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode={"time"}
        is24Hour={true}
        display="default"
        onChange={(e, d) => {
          if (Platform.OS === 'ios') {
            setDate(d);
            props.onChange(d);
          } else {
            props.onClose(d);
          }
        }}
        style={{ backgroundColor: "white" }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tb1: {
    backgroundColor: "#00000066",
    position: "absolute",
    justifyContent: "flex-end",
    width: "100%",
    height: "100%",
  },
  view1: {
    width: "100%",
    padding: 16,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderColor: "grey"
  }
});

export default DateTimePickerIOS;