import { Linking, StyleSheet, Text, View } from "react-native";
import { sizeConverter } from "src/util/functions";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function AttachmentMessage(props: IAttachmentMessageProps) {
  const { name, size, url, scrollToEnd } = props;

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="file-document" size={24} color="#555" />
      <View style={{ width: "84%" }}>
        <Text
          style={styles.text}
          onPress={() => Linking.openURL(url)}
          numberOfLines={1}
          onTextLayout={scrollToEnd}
        >
          {name}
        </Text>

        <Text style={styles.size}>{sizeConverter(size)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  text: {
    color: "#555",
    fontSize: 14,
    flexWrap: "wrap",
  },
  size: {
    color: "#555",
    marginTop: 3,
    fontSize: 13,
  },
});
