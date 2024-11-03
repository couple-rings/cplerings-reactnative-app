import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { primaryColor, secondaryColor } from "src/util/constants";

export default function Header(props: IHeaderProps) {
  const { subtitle, title } = props;

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: primaryColor,
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: "center",
  },
  title: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 5,
  },
  subtitle: {
    color: secondaryColor,
    textAlign: "center",
  },
});
