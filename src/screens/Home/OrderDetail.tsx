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
import Customer from "src/components/card/Customer";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { Picker } from "@react-native-picker/picker";
import {
  ButtonVariant,
  FailReason,
  ProductType,
  TransportOrderStatus,
} from "src/util/enums";
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import ConfirmModal from "src/components/dialog/ConfirmModal";
import Status from "src/components/card/Status";
import Button from "src/components/button/Button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getConversations,
  postCreateConversation,
} from "src/services/conversation.service";
import Toast from "react-native-toast-message";
import { useAppDispatch, useAppSelector } from "src/util/hooks";
import { selectConversation } from "src/redux/slices/conversation.slice";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { fetchConversations, fetchTransportOrders } from "src/util/querykey";
import { socket } from "src/config/socket";
import {
  putUpdateOrderOnGoing,
  putUpdateOrderStatus,
} from "src/services/transportOrder.service";
import { selectOrder } from "src/redux/slices/order.slice";

const successConfirm =
  "Bạn cần đảm bảo đơn hàng này đã được giao thành công, vì trạng thái đơn không thể thay đổi sau khi xác nhận.";

const failConfirm =
  "Bạn cần đảm bảo đơn hàng này đã giao thất bại, vì trạng thái đơn không thể thay đổi sau khi xác nhận.";

interface Inputs {
  note: string;
}

export default function OrderDetail() {
  const [selectedReason, setSelectedReason] = useState(FailReason.NotMet);
  const [error, setError] = useState(false);

  const [openConfirmSuccess, setOpenConfirmSuccess] = useState(false);
  const [openConfirmFail, setOpenConfirmFail] = useState(false);

  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const { id: userId } = useAppSelector((state) => state.auth.userInfo);
  const { orderVerified } = useAppSelector((state) => state.order);

  const navigation = useNavigation<NavigationProp<RootTabParamList>>();

  const { params } = useRoute<RouteProp<HomeStackParamList, "OrderDetail">>();
  // MyFlag
  const { id, order } = params;

  console.log(id);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { data: conversationResponse } = useQuery({
    queryKey: [fetchConversations, userId],
    queryFn: () => {
      return getConversations({ userId });
    },
    enabled: !!userId,
  });

  const chatMutation = useMutation({
    mutationFn: (data: ICreateConversationRequest) => {
      return postCreateConversation(data);
    },
    onSuccess: (response) => {
      if (response.error) {
        Toast.show({
          type: "error",
          text1: `${response.error}`,
        });
      }
    },
  });

  const acceptMutation = useMutation({
    mutationFn: (data: number[]) => {
      return putUpdateOrderOnGoing(data);
    },
    onSuccess: (response) => {
      if (response.data) {
        queryClient.invalidateQueries({
          queryKey: [fetchTransportOrders],
        });
        Toast.show({
          type: "success",
          text1: "Đã nhận đơn này",
        });
        navigation.navigate("HomeStack", { screen: "OrderList" });
      }

      if (response.errors) {
        response.errors.forEach((err) => {
          Toast.show({
            type: "error",
            text1: err.description,
          });
        });
      }
    },
  });

  const deliveryMutation = useMutation({
    mutationFn: (data: { id: number; status: TransportOrderStatus }) => {
      return putUpdateOrderStatus(data.id, data.status);
    },
    onSuccess: (response) => {
      if (response.data) {
        queryClient.invalidateQueries({
          queryKey: [fetchTransportOrders],
        });
        Toast.show({
          type: "success",
          text1: "Đã bắt đầu giao đơn này",
        });

        // MyFlag
        dispatch(selectOrder(order));
        navigation.navigate("Map");
      }

      if (response.errors) {
        response.errors.forEach((err) => {
          Toast.show({
            type: "error",
            text1: err.description,
          });
        });
      }
    },
  });

  const onInvalid: SubmitErrorHandler<Inputs> = (errors) => {
    if (errors.note && errors.note.ref && errors.note.ref.focus)
      errors.note.ref.focus();
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    console.log(selectedReason);
    setOpenConfirmFail(true);
  };

  const getProducts = () => {
    // MyFlag
    if (order.customOrder)
      return [order.customOrder.firstRing, order.customOrder.secondRing];

    return [];
  };

  const handlePressChat = async () => {
    const { customOrder } = order;

    let customerId = 0;
    if (customOrder) customerId = customOrder.customer.id;

    const res = await chatMutation.mutateAsync({
      participants: [userId, customerId],
    });

    if (res.data && conversationResponse?.data) {
      const rooms = conversationResponse.data.map(
        (conversation) => conversation._id
      );
      socket.emit("join_room", [...rooms, res.data._id], (response: string) =>
        console.log(response)
      );

      dispatch(selectConversation(res.data));
      navigation.navigate("ChatStack", { screen: "Chat" });
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>#{order.orderNo}</Text>
        </View>

        <View style={styles.body}>
          <View
            style={{
              marginTop: 16,
              gap: 10,
              flexDirection: "row",
            }}
          >
            <MaterialIcons name="my-library-books" size={20} color="black" />
            <Text style={styles.title}>
              Loại đơn: {order.customOrder && "Đơn mua nhẫn cưới"}
            </Text>
          </View>

          <View style={{ paddingBottom: 16 }}>
            <View style={{ ...styles.head, marginBottom: 8 }}>
              <Entypo name="box" size={20} color={secondaryColor} />
              <Text style={styles.title}>
                Hàng Giao ({getProducts().length})
              </Text>
            </View>

            {getProducts().map((item, index) => {
              let productType = ProductType.Jewelry;

              if (item.customDesign) productType = ProductType.WeddingRing;

              return (
                <Product key={item.id} productType={productType} data={item} />
              );
            })}
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
                onPress={handlePressChat}
                loading={chatMutation.isPending}
              >
                Chat
              </RnpButton>
            </View>

            <Customer
              name={order.receiverName}
              phone={order.receiverPhone}
              address={order.deliveryAddress}
            />

            {order.status === TransportOrderStatus.Delivering && (
              <RnpButton
                mode="elevated"
                buttonColor="white"
                textColor={secondaryColor}
                style={{ borderRadius: 10, marginVertical: 10 }}
                onPress={() => navigation.navigate("Map")}
              >
                Xem bản đồ
              </RnpButton>
            )}
          </View>

          {order.status !== TransportOrderStatus.Waiting && (
            <View>
              <View style={styles.head}>
                <MaterialCommunityIcons
                  name="note-text"
                  size={24}
                  color={secondaryColor}
                />
                <Text style={styles.title}>Thông Tin Cập Nhật</Text>
              </View>

              {order.transportationNotes.map((item, index) => (
                <Status {...item} key={index} />
              ))}

              {order.transportationNotes.length === 0 && (
                <Text style={{ marginBottom: 24 }}>
                  Chưa có thông tin cập nhật
                </Text>
              )}

              <RnpButton
                mode="elevated"
                buttonColor="white"
                textColor={secondaryColor}
                style={{ borderRadius: 10, marginBottom: 10 }}
                onPress={() =>
                  navigation.navigate("HomeStack", {
                    screen: "UpdateStatus",
                    // MyFlag
                    params: { orderId: order.id, order },
                  })
                }
              >
                Xem thêm
              </RnpButton>
            </View>
          )}

          <View>
            {order.status === TransportOrderStatus.Waiting && (
              <Button
                title={"Nhận Đơn"}
                variant={ButtonVariant.Contained}
                style={{ marginTop: 30, marginBottom: 60 }}
                options={{ onPress: () => acceptMutation.mutate([order.id]) }}
                loading={acceptMutation.isPending}
              />
            )}

            {order.status === TransportOrderStatus.OnGoing && (
              <Button
                title={"Bắt Đầu Giao"}
                variant={ButtonVariant.Contained}
                style={{ marginTop: 30, marginBottom: 60 }}
                options={{
                  onPress: () =>
                    deliveryMutation.mutate({
                      id: order.id,
                      status: TransportOrderStatus.Delivering,
                    }),
                }}
                loading={deliveryMutation.isPending}
              />
            )}

            {order.status === TransportOrderStatus.Delivering && (
              <>
                {/* Handle complete order */}
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
                    onPress={() =>
                      navigation.navigate("HomeStack", { screen: "Scan" })
                    }
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
                    onPress={() => {
                      if (!orderVerified) {
                        setError(true);
                        return;
                      }
                      setOpenConfirmSuccess(true);
                    }}
                  >
                    Bước 3: Xác nhận hoàn thành
                  </RnpButton>
                </Card>
                {error && (
                  <HelperText type="error" style={{ marginTop: 8 }}>
                    * Chưa xác minh CCCD khách hàng
                  </HelperText>
                )}

                {/* Handle reject order */}
                <View style={styles.head}>
                  <AntDesign
                    name="closesquareo"
                    size={20}
                    color={secondaryColor}
                  />
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
                        placeholderTextColor={
                          errors.note ? "red" : secondaryColor
                        }
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
              </>
            )}
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
