import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Avatar, Card } from "react-native-paper";
import { secondaryColor } from "src/util/constants";
import moment from "moment";

export default function Status(props: IStatusCardProps) {
  const { note, date, pressStatus } = props;

  return (
    <Card
      style={styles.container}
      onPress={() => pressStatus && pressStatus(note)}
    >
      <Text style={styles.time}>
        {moment(date).format("HH:mm MMM Do YYYY")}
      </Text>
      <View style={styles.content}>
        <Avatar.Icon
          size={32}
          icon="note-text-outline"
          color="white"
          style={{ backgroundColor: "black" }}
        />
        <Text style={styles.note} numberOfLines={2}>
          {note}
        </Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
    paddingTop: 12,
    marginBottom: 16,
  },
  time: {
    fontSize: 12,
    color: secondaryColor,
    textAlign: "right",
    marginBottom: 1,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  note: {
    color: secondaryColor,
    flex: 1,
    textAlign: "justify",
  },
});
