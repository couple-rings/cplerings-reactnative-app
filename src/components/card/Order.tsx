import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Card } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { secondaryColor } from "src/util/constants";
import { formatStatus, formatStatusColor } from "src/util/functions";
import moment from "moment";

export default function Order(props: IOrderCardProps) {
  const { data } = props;

  const {
    receiverName,
    receiverPhone,
    deliveryAddress,
    status,
    customOrder,
    orderNo,
    id,
    standardOrder,
    transportOrderHistories,
  } = data;

  const navigation = useNavigation<NavigationProp<HomeStackParamList>>();

  return (
    <Card
      style={styles.container}
      onPress={() => navigation.navigate("OrderDetail", { id })}
    >
      <View style={styles.header}>
        <Text style={styles.orderId}>#{orderNo}</Text>

        <Text style={{ ...styles.status, color: formatStatusColor(status) }}>
          {formatStatus(status)}
        </Text>
      </View>

      <Text style={styles.time}>
        Cập Nhật:{" "}
        {moment(
          transportOrderHistories.find((item) => item.status === status)
            ?.createdAt
        ).format("DD/MM/YYY HH:mm")}
      </Text>

      <View style={styles.row}>
        <MaterialCommunityIcons
          name="account"
          size={20}
          color={secondaryColor}
        />
        <Text style={styles.text}>
          {receiverName} / {receiverPhone}
        </Text>
      </View>
      <View style={styles.row}>
        <FontAwesome6
          name="map-location-dot"
          size={16}
          color={secondaryColor}
        />
        <Text style={{ ...styles.text, flex: 1 }} numberOfLines={1}>
          {deliveryAddress}
        </Text>
      </View>
      <View
        style={{
          ...styles.row,
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <View style={styles.row}>
          <MaterialIcons
            name="sticky-note-2"
            size={20}
            color={secondaryColor}
          />
          <Text style={styles.text}>Shipping in office hours</Text>
        </View>

        <TouchableOpacity style={styles.quantity}>
          <Entypo name="box" size={14} color={secondaryColor} />
          <Text style={styles.text}>
            {customOrder && 2}
            {standardOrder && standardOrder.standardOrderItems.length}
          </Text>
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
    marginBottom: 6,
  },
  time: {
    fontSize: 12,
    color: secondaryColor,
    marginBottom: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  text: {
    color: secondaryColor,
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
