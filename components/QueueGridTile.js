import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";

const QueueGridTile = (props) => {
  return (
    <TouchableOpacity
      style={styles.gridItem}
    >

      <View
        style={{ ...styles.container, ...{ backgroundColor: "#F0F0F0", } }}
      >
        <View style={{
          width: "100%",
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}>
          <Text style={{ fontFamily: "Prompt_400Regular", }}>{props.title}</Text>
          <Text style={{ color: '#bebebe', fontFamily: "Prompt_400Regular",color:"black" }}>{props.detail}</Text>

        </View>


      </View>






    </TouchableOpacity>





  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 10,
    height: 50,
  },

  container: {
    width:"100%",
    elevation: 3,
    flex: 1,
    shadowRadius: 30,
    padding: 15,
    shadowColor: "black",
    height: 5,
    borderRadius: 15,
    justifyContent: "flex-end",
    shadowOffset: { width: 0, height: 2 },
  },


  title: {
    fontSize: 18,
    textAlign: "center",
  },
  bgContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  bgImage: {
    width: 70,
    height: 70,
  },
});

export default QueueGridTile;