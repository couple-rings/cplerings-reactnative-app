import { StyleSheet, Text, View } from "react-native";
import React from "react";
import moment from "moment";
import { secondaryColor } from "src/util/constants";
import { Avatar } from "react-native-paper";

export default function PartnerMessage(props: IPartnerMessageProps) {
  const { children, timestamp, isImage } = props;

  return (
    <View style={styles.container}>
      <Avatar.Text size={24} label="M" />
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
    flexDirection: "row",
    gap: 8,
  },
  children: {
    maxWidth: "80%",
    minWidth: 120,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "white",
    elevation: 1,
  },
  time: {
    color: secondaryColor,
    fontSize: 13,
    marginTop: 6,
  },
});
