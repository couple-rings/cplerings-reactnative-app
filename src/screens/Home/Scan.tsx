import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "src/components/button/Button";
import { primaryColor } from "src/util/constants";
import { ButtonVariant } from "src/util/enums";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export default function Scan() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  const ref = useRef<CameraView>(null);

  const navigation = useNavigation<NavigationProp<HomeStackParamList>>();

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: undefined,
      });
  }, [navigation]);

  if (!permission) {
    // Camera permissions are still loading.
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator color={primaryColor} size={50} />
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Vui lòng cấp quyền truy cập để sử dụng camera
        </Text>
        <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
          <Button
            title="Cấp Quyền Truy Cập"
            variant={ButtonVariant.Contained}
            options={{ onPress: requestPermission }}
          />
        </View>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const handleTakePicture = async () => {
    const data = await ref.current?.takePictureAsync();

    console.log(data);

    // {uri: data.uri, name: '*.jpg', type: 'image/jpeg'}
    // must specify header content type
  };

  return (
    <SafeAreaView style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={ref}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <MaterialIcons name="flip-camera-ios" size={40} color="white" />
          </TouchableOpacity>
        </View>
      </CameraView>

      <View
        style={{ flex: 1, paddingHorizontal: 20, justifyContent: "center" }}
      >
        <Button
          title="Xác Nhận"
          variant={ButtonVariant.Contained}
          options={{ onPress: handleTakePicture }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
    fontSize: 16,
  },
  camera: {
    flex: 5,
  },
  buttonContainer: {
    backgroundColor: "transparent",
    margin: 20,
  },
  button: {
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
  },
});
