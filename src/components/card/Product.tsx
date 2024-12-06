import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Card } from "react-native-paper";
import { secondaryColor } from "src/util/constants";
import { DesignCharacteristic, ProductType } from "src/util/enums";
import { getDiamondSpec } from "src/util/functions";

export default function Product(props: IProductCardProps) {
  const { productType, ring, jewelry } = props;

  const jewelryImg = jewelry?.design.designMetalSpecifications.find(
    (item) => item.metalSpecification.id === jewelry.metalSpecification.id
  )?.image.url;

  return (
    <Card style={{ marginVertical: 10 }}>
      <View style={styles.container}>
        <Card style={{ height: 90, width: 90 }}>
          {ring && (
            <Image
              source={{ uri: ring.customDesign.designVersion.image.url }}
              style={styles.image}
            />
          )}

          {jewelryImg && (
            <Image source={{ uri: jewelryImg }} style={styles.image} />
          )}
        </Card>

        <View style={{ flex: 1 }}>
          {productType === ProductType.WeddingRing && ring && (
            <Text style={styles.name}>
              Nhẫn Cưới{" "}
              {ring.customDesign.designVersion.design.characteristic ===
              DesignCharacteristic.Male
                ? "Nam"
                : "Nữ"}
            </Text>
          )}

          {productType === ProductType.Jewelry && jewelry && (
            <Text style={styles.name}>
              {jewelry.design.name} (
              {jewelry.design.characteristic === DesignCharacteristic.Male
                ? "Nam Giới"
                : "Nữ Giới"}
              )
            </Text>
          )}

          <View style={styles.row}>
            <Text style={styles.text}>
              <Text style={styles.label}>Chất liệu: </Text>
              {ring && ring.metalSpecification.name}
              {jewelry && jewelry.metalSpecification.name}
            </Text>
          </View>

          {jewelry && (
            <View style={styles.row}>
              <Text style={styles.text}>
                <Text style={styles.label}>Kích thước: </Text>
                {jewelry.design.size} cm
              </Text>
            </View>
          )}

          {jewelry && (
            <View style={styles.row}>
              <Text style={styles.text}>
                <Text style={styles.label}>Khối lượng: </Text>
                {jewelry.design.metalWeight} chỉ
              </Text>
            </View>
          )}

          {ring && ring.diamonds && (
            <View style={styles.row}>
              <Text style={styles.text}>
                <Text style={styles.label}>Kim cương:</Text>{" "}
                {`${getDiamondSpec(ring.diamonds[0].diamondSpecification)}`}
              </Text>
            </View>
          )}

          {ring && (
            <View style={styles.row}>
              <Text style={styles.text}>
                <Text style={styles.label}>Khắc chữ:</Text>{" "}
                {ring.engraving ? ring.engraving : "--"}
              </Text>
            </View>
          )}
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
    marginTop: 6,
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
