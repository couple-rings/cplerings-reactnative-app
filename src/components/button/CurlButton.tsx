import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ButtonVariant } from "src/util/enums";
import { primaryColor } from "src/util/constants";

export default function CurlButton(props: ICurlButtonProps) {
  const { title, variant, options, style } = props;

  const containerStyle =
    variant === ButtonVariant.Contained ? styles.contained : styles.outlined;
  const textStyle =
    variant === ButtonVariant.Contained
      ? styles.containedText
      : styles.outlinedText;

  return (
    <TouchableOpacity style={[containerStyle, style]} {...options}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  outlined: {
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  contained: {
    borderRadius: 20,
    paddingVertical: 8,
    backgroundColor: "white",
    paddingHorizontal: 16,
  },
  containedText: {
    color: primaryColor,
    textAlign: "center",
    fontSize: 16,
  },
  outlinedText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});
