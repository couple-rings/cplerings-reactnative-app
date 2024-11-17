import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { primaryColor, secondaryColor } from "src/util/constants";
import Product from "src/components/card/Product";
import {
  Card,
  HelperText,
  Button as RnpButton,
  TextInput,
} from "react-native-paper";
// import Button from "src/components/button/Button";
import Customer from "src/components/card/Customer";
// import { ButtonVariant } from "src/util/enums";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { Picker } from "@react-native-picker/picker";
import { FailReason } from "src/util/enums";
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import ConfirmModal from "src/components/dialog/ConfirmModal";
import Status from "src/components/card/Status";
import moment from "moment";

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

const status = [
  {
    time: moment().format("HH:mm MMM Do YYYY"),
    note: "Update note",
  },
  {
    time: moment().format("HH:mm MMM Do YYYY"),
    note: "Update note",
  },
  {
    time: moment().format("HH:mm MMM Do YYYY"),
    note: "Update note",
  },
];

const successConfirm =
  "Bạn cần đảm bảo đơn hàng này đã được giao thành công, vì trạng thái đơn không thể thay đổi sau khi xác nhận.";

const failConfirm =
  "Bạn cần đảm bảo đơn hàng này đã giao thất bại, vì trạng thái đơn không thể thay đổi sau khi xác nhận.";

interface Inputs {
  note: string;
}

export default function OrderDetail() {
  const [selectedReason, setSelectedReason] = useState(FailReason.NotMet);

  const [openConfirmSuccess, setOpenConfirmSuccess] = useState(false);
  const [openConfirmFail, setOpenConfirmFail] = useState(false);

  const navigation = useNavigation<NavigationProp<HomeStackParamList>>();

  const { params } = useRoute<RouteProp<HomeStackParamList, "OrderDetail">>();
  const { id } = params;

  console.log(id);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onInvalid: SubmitErrorHandler<Inputs> = (errors) => {
    if (errors.note && errors.note.ref && errors.note.ref.focus)
      errors.note.ref.focus();
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    console.log(selectedReason);
    setOpenConfirmFail(true);
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>#OrderID</Text>
        </View>

        <View style={styles.body}>
          <View style={{ paddingBottom: 16 }}>
            <View style={{ ...styles.head, marginBottom: 8 }}>
              <Entypo name="box" size={20} color={secondaryColor} />
              <Text style={styles.title}>Item (2)</Text>
            </View>

            {products.map((item, index) => (
              <Product key={index} {...item} />
            ))}
          </View>

          <View>
            <View style={styles.customerHead}>
              <View style={styles.head}>
                <MaterialCommunityIcons
                  name="account"
                  size={24}
                  color={secondaryColor}
                />
                <Text style={styles.title}>Thông Tin Khách Hàng</Text>
              </View>

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

            <RnpButton
              mode="elevated"
              buttonColor="white"
              textColor={secondaryColor}
              style={{ borderRadius: 10, marginVertical: 10 }}
            >
              Xem bản đồ
            </RnpButton>
          </View>

          <View>
            <View style={styles.head}>
              <MaterialCommunityIcons
                name="note-text"
                size={24}
                color={secondaryColor}
              />
              <Text style={styles.title}>Thông Tin Cập Nhật</Text>
            </View>

            {status.map((item, index) => (
              <Status {...item} key={index} />
            ))}

            <RnpButton
              mode="elevated"
              buttonColor="white"
              textColor={secondaryColor}
              style={{ borderRadius: 10, marginBottom: 10 }}
              onPress={() =>
                navigation.navigate("UpdateStatus", { orderId: 1 })
              }
            >
              Xem thêm
            </RnpButton>
          </View>

          <View>
            {/* <Button
              // eslint-disable-next-line no-constant-condition
              title={true ? "Nhận Đơn" : "Bắt Đầu Giao"}
              variant={ButtonVariant.Contained}
              style={{ marginTop: 30, marginBottom: 60 }}
            /> */}

            <View style={styles.head}>
              <MaterialCommunityIcons
                name="check-decagram"
                size={24}
                color={secondaryColor}
              />
              <Text style={styles.title}>Xác Nhận Giao Hàng</Text>
            </View>
            <Card style={styles.cardContent}>
              <Text style={styles.guideTitle}>
                Hình ảnh xác nhận: 1 trong 2 cách sau
              </Text>
              <Text style={styles.guideItem}>
                1. Ảnh chụp chung với khách hàng
              </Text>
              <Text style={styles.guideItem}>
                2. Ảnh chụp khách hàng và sản phẩm
              </Text>

              <View style={styles.hr}></View>

              <RnpButton
                mode="elevated"
                buttonColor="white"
                textColor={secondaryColor}
                icon={"barcode-scan"}
                style={styles.step}
                onPress={() => navigation.navigate("Scan")}
              >
                <Text>Bước 1: Xác nhận CCCD khách hàng</Text>
              </RnpButton>

              <RnpButton
                mode="elevated"
                buttonColor="white"
                textColor={secondaryColor}
                icon={"camera"}
                style={styles.step}
              >
                Bước 2: Upload ảnh giao hàng
              </RnpButton>

              <RnpButton
                mode="elevated"
                buttonColor="white"
                textColor={secondaryColor}
                icon={"checkbox-marked"}
                style={styles.step}
                onPress={() => setOpenConfirmSuccess(true)}
              >
                Bước 3: Xác nhận hoàn thành
              </RnpButton>
            </Card>

            <View style={styles.head}>
              <AntDesign name="closesquareo" size={20} color={secondaryColor} />
              <Text style={styles.title}>Giao Hàng Thất Bại</Text>
            </View>
            <Card style={styles.cardContent}>
              <Text style={{ color: secondaryColor, ...styles.title }}>
                Chọn Trường Hợp
              </Text>
              <Picker
                style={{ color: secondaryColor }}
                selectedValue={selectedReason}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedReason(itemValue)
                }
              >
                <Picker.Item
                  label="Không gặp được khách hàng"
                  value={FailReason.NotMet}
                />
                <Picker.Item
                  label="Khách hàng từ chối nhận hàng"
                  value={FailReason.Rejected}
                />
              </Picker>

              <Controller
                name="note"
                control={control}
                rules={{
                  required: "* Vui lòng nhập lý do",
                }}
                render={({ field: { value, onChange, ref } }) => (
                  <TextInput
                    error={!!errors.note}
                    placeholder="Nêu cụ thể lý do..."
                    mode="outlined"
                    multiline
                    numberOfLines={5}
                    style={styles.textInput}
                    placeholderTextColor={errors.note ? "red" : secondaryColor}
                    cursorColor={secondaryColor}
                    textColor={secondaryColor}
                    outlineColor="#D9D9D9"
                    theme={{
                      colors: {
                        primary: secondaryColor,
                      },
                      roundness: 10,
                    }}
                    value={value}
                    onChangeText={onChange}
                    ref={ref}
                  />
                )}
              />
              {errors.note && (
                <HelperText type="error">{errors.note.message}</HelperText>
              )}

              <RnpButton
                mode="elevated"
                buttonColor="white"
                textColor={secondaryColor}
                style={{ borderRadius: 10, marginVertical: 16 }}
                onPress={handleSubmit(onSubmit, onInvalid)}
              >
                Xác Nhận
              </RnpButton>
            </Card>
          </View>
        </View>

        <ConfirmModal
          visible={openConfirmSuccess}
          setVisible={setOpenConfirmSuccess}
          title="Giao Hàng Thành Công"
          message={successConfirm}
        />

        <ConfirmModal
          visible={openConfirmFail}
          setVisible={setOpenConfirmFail}
          title="Giao Hàng Thất Bại"
          message={failConfirm}
        />
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
    paddingBottom: 24,
  },
  customerHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  head: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 24,
  },
  cardContent: {
    backgroundColor: "white",
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  guideTitle: {
    fontWeight: "600",
    fontStyle: "italic",
    color: secondaryColor,
    fontSize: 16,
    marginBottom: 6,
  },
  guideItem: {
    fontSize: 14,
    marginVertical: 4,
    color: secondaryColor,
  },
  hr: {
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 12,
  },
  step: {
    borderRadius: 10,
    marginVertical: 8,
    alignItems: "flex-start",
  },
  textInput: {
    paddingVertical: 12,
    marginBottom: 6,
    backgroundColor: "white",
  },
});
