import { Text, StyleSheet } from "react-native";
import React from "react";

export default function TextMessage(props: ITextMessageProps) {
  const { content } = props;

  return <Text style={styles.text}>{content}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: "#555",
  },
});
