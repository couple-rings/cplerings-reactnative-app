import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";

const OrderList = () => {
  useEffect(() => {
    Toast.show({
      type: "success",
      text1: "This is some something 👋",
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
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
