import { StyleSheet, Text, View } from "react-native";
import React from "react";
import moment from "moment";
import { secondaryColor } from "src/util/constants";

export default function OwnMessage(props: IOwnMessageProps) {
  const { children, timestamp, isImage } = props;

  return (
    <View style={styles.container}>
      {isImage ? (
        <View>
          {children}
          <Text style={styles.time}>{moment(timestamp).format("HH:mm")}</Text>
        </View>
      ) : (
        <View style={styles.children}>
          {children}

          <Text style={styles.time}>{moment(timestamp).format("HH:mm")}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    alignItems: "flex-end",
  },
  children: {
    maxWidth: "80%",
    minWidth: 120,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#e5efff",
    elevation: 1,
  },
  time: {
    color: secondaryColor,
    fontSize: 13,
    marginTop: 6,
  },
});
