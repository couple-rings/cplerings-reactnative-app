import { Image, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";

export default function ImageMessage(props: IImageMessageProps) {
  const { url } = props;

  const [ratio, setRatio] = useState(0);

  useEffect(() => {
    Image.getSize(url, (width, height) => {
      setRatio(width / height);
    });
  }, [url]);

  return (
    <View style={{ width: 250 }}>
      <Image
        source={{ uri: url }}
        style={[styles.image, { width: "100%", aspectRatio: ratio }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    resizeMode: "contain",
    borderRadius: 5,
  },
});
