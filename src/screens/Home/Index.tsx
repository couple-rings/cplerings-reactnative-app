import { View, Text, StyleSheet } from "react-native";
import Button from "src/components/button/Button";
import { logout } from "src/redux/slices/auth.slice";
import { ButtonVariant } from "src/util/enums";
import { useAppDispatch } from "src/util/hooks";

const OrderList = () => {
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Button
        title="Đăng Xuất"
        variant={ButtonVariant.Contained}
        options={{ onPress: () => dispatch(logout()) }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default OrderList;
