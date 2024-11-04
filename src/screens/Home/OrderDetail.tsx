import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { primaryColor, secondaryColor } from "src/util/constants";
import Product from "src/components/card/Product";
import { Card, Button as RnpButton } from "react-native-paper";
// import Button from "src/components/button/Button";
import Customer from "src/components/card/Customer";
// import { ButtonVariant } from "src/util/enums";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
const menring = require("assets/menring.png");

const products = [
  {
    name: "DR D Double Row Band Pavé Wedding Ring (Man)",
    size: 3,
    engraving: "NVA",
    metal: "Vàng Trắng 18K",
    diamond: "15PT, D, VS1",
    image: menring,
  },
  {
    name: "DR D Double Row Band Pavé Wedding Ring (Man)",
    size: 3,
    engraving: "NVA",
    metal: "Vàng Trắng 18K",
    diamond: "15PT, D, VS1",
    image: menring,
  },
];

const customer = {
  name: "Nguyễn Văn A",
  phone: "0123456789",
  address: "944 TL43, KP2, Tan Thoi, Thu Duc",
};

export default function OrderDetail() {
  const { params } = useRoute<RouteProp<HomeStackParamList, "OrderDetail">>();
  const { id } = params;
  console.log(id);

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>#OrderID</Text>
        </View>

        <View style={styles.body}>
          <View style={{ paddingBottom: 16 }}>
            <Text style={styles.quantity}>Item (2)</Text>
            {products.map((item, index) => (
              <Product key={index} {...item} />
            ))}
          </View>

          <View>
            <View style={styles.customerHead}>
              <Text style={styles.title}>Thông Tin Khách Hàng</Text>
              <RnpButton
                icon="chat"
                mode="elevated"
                buttonColor="white"
                textColor="black"
                labelStyle={{ fontSize: 16 }}
                style={{ borderRadius: 5 }}
              >
                Chat
              </RnpButton>
            </View>

            <Customer {...customer} />
          </View>

          <View>
            {/* <Button
              // eslint-disable-next-line no-constant-condition
              title={true ? "Nhận Đơn" : "Bắt Đầu Giao"}
              variant={ButtonVariant.Contained}
              style={{ marginTop: 30, marginBottom: 60 }}
            /> */}

            <RnpButton
              mode="elevated"
              buttonColor="white"
              textColor="#6F6A6A"
              style={{ borderRadius: 10, marginVertical: 10 }}
            >
              Xem bản đồ
            </RnpButton>

            <View style={styles.verifyHead}>
              <MaterialCommunityIcons
                name="check-decagram"
                size={24}
                color="#6F6A6A"
              />
              <Text style={styles.title}>Xác Nhận Giao Hàng</Text>
            </View>

            <Card style={styles.verifyBody}>
              <Text style={styles.guideTitle}>
                Hình ảnh xác nhận: 1 trong 2 cách sau
              </Text>
              <Text style={styles.guideItem}>
                1. Ảnh chụp chung với khách hàng
              </Text>
              <Text style={styles.guideItem}>
                2. Ảnh chụp khách hàng và sản phẩm
              </Text>
            </Card>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: primaryColor,
    paddingBottom: 12,
  },
  headerTitle: {
    textAlign: "center",
    color: secondaryColor,
  },
  body: {
    paddingHorizontal: 16,
  },
  quantity: {
    marginTop: 16,
    marginBottom: 8,
    fontWeight: "600",
    fontSize: 16,
  },
  customerHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  verifyHead: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 12,
  },
  verifyBody: {
    backgroundColor: "white",
    padding: 16,
  },
  guideTitle: {
    fontWeight: "600",
    fontStyle: "italic",
    color: "#6F6A6A",
    fontSize: 16,
    marginBottom: 6,
  },
  guideItem: {
    fontSize: 14,
    marginVertical: 4,
    color: "#6F6A6A",
  },
});
