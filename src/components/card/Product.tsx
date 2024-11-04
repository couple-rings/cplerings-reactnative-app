import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Card } from "react-native-paper";

export default function Product(props: IProductCardProps) {
  const { diamond, engraving, image, metal, name, size } = props;

  return (
    <Card style={{ marginVertical: 10 }}>
      <View style={styles.container}>
        <Card style={{ height: 90, width: 90 }}>
          <Image source={image} style={styles.image} />
        </Card>

        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.row}>
            <Text style={styles.text}>
              <Text style={styles.label}>Metal:</Text>
              {metal}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.label}>Kim cương:</Text> {diamond}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>
              <Text style={styles.label}>Khắc chữ:</Text> {engraving}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.label}>Kích thước:</Text> {size}
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 16,
    backgroundColor: "white",
    padding: 12,
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    marginTop: 8,
  },
  label: {
    fontWeight: "500",
  },
  name: {
    color: "#6F6A6A",
    fontWeight: "500",
  },
  text: {
    fontSize: 10,
    color: "#6F6A6A",
    width: "50%",
  },
});
