import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Card } from "react-native-paper";
import { secondaryColor } from "src/util/constants";
import { DesignCharacteristic, ProductType } from "src/util/enums";
import { getDiamondSpec } from "src/util/functions";

export default function Product(props: IProductCardProps) {
  const { productType, data } = props;

  return (
    <Card style={{ marginVertical: 10 }}>
      <View style={styles.container}>
        <Card style={{ height: 90, width: 90 }}>
          {data.customDesign && (
            <Image
              source={{ uri: data.customDesign.designVersion.image.url }}
              style={styles.image}
            />
          )}
        </Card>

        <View style={{ flex: 1 }}>
          {productType === ProductType.WeddingRing && data.customDesign && (
            <Text style={styles.name}>
              Nhẫn Cưới{" "}
              {data.customDesign.designVersion.design.characteristic ===
              DesignCharacteristic.Male
                ? "Nam"
                : "Nữ"}
            </Text>
          )}

          <View style={styles.row}>
            <Text style={styles.text}>
              <Text style={styles.label}>Chất liệu:</Text>
              {data.metalSpecification.name}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.text}>
              <Text style={styles.label}>Kim cương:</Text>{" "}
              {data.diamonds &&
                `${
                  data.diamonds[0].diamondSpecification.shape
                } ${getDiamondSpec(data.diamonds[0].diamondSpecification)}`}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.text}>
              <Text style={styles.label}>Khắc chữ:</Text>{" "}
              {data.engraving ? data.engraving : "--"}
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
    paddingRight: 24,
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
    color: secondaryColor,
    fontWeight: "500",
  },
  text: {
    fontSize: 10,
    color: secondaryColor,
  },
});
