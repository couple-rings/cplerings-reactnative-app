import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { primaryColor } from "src/util/constants";
import { ButtonVariant } from "src/util/enums";

export default function Button(props: IButtonProps) {
  const { title, style, options, variant, loading = false } = props;

  const containerStyle =
    variant === ButtonVariant.Contained ? styles.contained : styles.outlined;
  const textStyle =
    variant === ButtonVariant.Contained
      ? styles.containedText
      : styles.outlinedText;

  return (
    <TouchableOpacity
      style={[containerStyle, style, loading && styles.loading]}
      {...options}
    >
      {loading && <ActivityIndicator size={"small"} color={"white"} />}

      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  contained: {
    backgroundColor: primaryColor,
    padding: 16,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
  },
  outlined: {
    borderWidth: 1,
    borderColor: primaryColor,
    padding: 16,
    borderRadius: 5,
  },
  containedText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  outlinedText: {
    color: primaryColor,
    textAlign: "center",
    fontSize: 16,
  },
  loading: {
    opacity: 0.5,
  },
});
