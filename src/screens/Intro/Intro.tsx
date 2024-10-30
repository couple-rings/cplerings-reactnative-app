import { StyleSheet, Text, Image, SafeAreaView, View } from "react-native";
import Button from "src/components/button/Button";
import { primaryColor } from "src/util/constants";
import { ButtonVariant } from "src/util/enums";
const intro = require("assets/intro.png");

export default function Intro() {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={intro} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title}>COUPLE RINGS</Text>
        <Text style={styles.subtitle}>Một tình yêu, một đời người</Text>

        <Button
          title="Bắt Đầu"
          style={styles.button}
          variant={ButtonVariant.Contained}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    resizeMode: "cover",
    width: undefined,
    height: undefined,
    flex: 1,
  },
  content: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 36,
    paddingVertical: 58,
  },
  title: {
    color: primaryColor,
    fontSize: 38,
    fontWeight: "500",
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    fontStyle: "italic",
    color: primaryColor,
    textAlign: "center",
    fontSize: 18,
  },
  button: {
    marginTop: 50,
  },
});
