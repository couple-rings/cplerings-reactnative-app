import { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Button from "src/components/button/Button";
import CurlButton from "src/components/button/CurlButton";
import Order from "src/components/card/Order";
import { logout } from "src/redux/slices/auth.slice";
import { removeConversations } from "src/redux/slices/conversation.slice";
import { removeMessages } from "src/redux/slices/message.slice";
import { primaryColor } from "src/util/constants";
import { ButtonVariant, OrderStatus } from "src/util/enums";
import { useAppDispatch } from "src/util/hooks";

const status = [
  "All (12)",
  "Waiting (2)",
  "On Going (7)",
  "Fulfilled (2)",
  "Not Fulfilled (1)",
];

const orders = [
  {
    name: "Nguyễn Văn A",
    phone: "0123456789",
    address: "944 TL43, KP2, Tan Thoi, Thu Duc",
    quantity: 2,
    status: OrderStatus.OnGoing,
  },
  {
    name: "Nguyễn Văn A",
    phone: "0123456789",
    address: "944 TL43, KP2, Tan Thoi, Thu Duc",
    quantity: 2,
    status: OrderStatus.OnGoing,
  },
  {
    name: "Nguyễn Văn A",
    phone: "0123456789",
    address: "944 TL43, KP2, Tan Thoi, Thu Duc",
    quantity: 2,
    status: OrderStatus.OnGoing,
  },
  {
    name: "Nguyễn Văn A",
    phone: "0123456789",
    address: "944 TL43, KP2, Tan Thoi, Thu Duc",
    quantity: 2,
    status: OrderStatus.OnGoing,
  },
];

const OrderList = () => {
  const [selected, setSelected] = useState(status[0]);

  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.statusBar}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={status}
          renderItem={({ item }) => (
            <CurlButton
              title={item}
              variant={
                selected === item
                  ? ButtonVariant.Contained
                  : ButtonVariant.Outlined
              }
              options={{ onPress: () => setSelected(item) }}
            />
          )}
          contentContainerStyle={styles.content}
        />
      </View>

      <FlatList
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={orders}
        renderItem={({ item }) => <Order {...item} />}
        contentContainerStyle={{ padding: 16 }}
      />

      <Button
        title="Đăng Xuất"
        variant={ButtonVariant.Contained}
        options={{
          onPress: () => {
            dispatch(removeConversations());
            dispatch(removeMessages());
            dispatch(logout());
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  statusBar: {
    width: "100%",
    backgroundColor: primaryColor,
    paddingBottom: 20,
  },
  content: {
    paddingHorizontal: 16,
    gap: 16,
  },
});

export default OrderList;
