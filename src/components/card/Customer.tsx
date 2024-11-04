import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Card } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Customer(props: ICustomerCardProps) {
  const { address, name, phone } = props;

  return (
    <Card style={styles.container}>
      <View style={styles.row}>
        <MaterialCommunityIcons name="account" size={20} color="#6F6A6A" />
        <Text style={styles.text}>
          {name} / {phone}
        </Text>
      </View>
      <View style={styles.row}>
        <FontAwesome6 name="map-location-dot" size={16} color="#6F6A6A" />
        <Text style={styles.text}>{address}</Text>
      </View>
      <View style={styles.row}>
        <MaterialIcons name="sticky-note-2" size={20} color="#6F6A6A" />
        <Text style={styles.text}>Shipping in office hours</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "white",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 6,
  },
  text: {
    color: "#6F6A6A",
  },
});
