import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Card } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";

export default function Order(props: IOrderCardProps) {
  const { address, name, phone, quantity, status } = props;
  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.orderId}>#Order ID</Text>
        <Text style={styles.status}>{status}</Text>
      </View>

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
      <View
        style={{
          ...styles.row,
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <View style={styles.row}>
          <MaterialIcons name="sticky-note-2" size={20} color="#6F6A6A" />
          <Text style={styles.text}>Shipping in office hours</Text>
        </View>

        <TouchableOpacity style={styles.quantity}>
          <Entypo name="box" size={14} color="#6F6A6A" />
          <Text style={styles.text}>{quantity}</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 12,
    backgroundColor: "white",
    marginVertical: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  text: {
    color: "#6F6A6A",
  },
  orderId: {
    fontWeight: "500",
    fontSize: 16,
  },
  status: {
    fontSize: 16,
    textTransform: "capitalize",
  },
  quantity: {
    borderWidth: 1,
    borderRadius: 7,
    borderColor: "#D9D9D9",
    backgroundColor: "#F5F5F5",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 3,
    paddingHorizontal: 5,
    marginTop: 6,
  },
});
