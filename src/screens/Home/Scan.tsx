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
import { ButtonVariant, IdReadingResponseCode } from "src/util/enums";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { postIdReading } from "src/services/fpt.service";
import Toast from "react-native-toast-message";
import { getVerifySpouse } from "src/services/spouse.service";
import { useAppDispatch, useAppSelector } from "src/util/hooks";
import { verifyOrder } from "src/redux/slices/order.slice";

export default function Scan() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  const ref = useRef<CameraView>(null);
  const dispatch = useAppDispatch();

  // MyFlag
  const { currentOrder } = useAppSelector((state) => state.order);

  const navigation = useNavigation<NavigationProp<HomeStackParamList>>();

  const idReadMutation = useMutation({
    mutationFn: (file: IFileRequest) => {
      return postIdReading(file);
    },
    onSuccess: (response) => {
      if (response.errorCode === IdReadingResponseCode.Success) {
        if (response.data.length > 0)
          verifyMutation.mutate(response.data[0].id);
      } else {
        Toast.show({
          type: "error",
          text1: response.errorMessage,
        });
      }
    },
  });

  const verifyMutation = useMutation({
    mutationFn: (citizenId: string) => {
      return getVerifySpouse(citizenId);
    },
    onSuccess: (response) => {
      if (response.data) {
        Toast.show({
          type: "success",
          text1: "Xác minh thành công",
        });
        dispatch(verifyOrder());
        // MyFlag
        if (currentOrder)
          navigation.navigate("OrderDetail", {
            id: currentOrder.id,
            order: currentOrder,
          });
      }

      if (response.errors) {
        response.errors.forEach((err) => {
          Toast.show({
            type: "error",
            text1: err.description,
          });
        });
      }
    },
  });

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

    if (data) {
      const { uri } = data;
      idReadMutation.mutate({
        uri,
        name: "CCCD.jpg",
        type: "image/jpeg",
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {verifyMutation.isPending || idReadMutation.isPending ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={50} color={primaryColor} />
        </View>
      ) : (
        <CameraView style={styles.camera} facing={facing} ref={ref}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={toggleCameraFacing}
            >
              <MaterialIcons name="flip-camera-ios" size={40} color="white" />
            </TouchableOpacity>
          </View>
        </CameraView>
      )}

      <View
        style={{ flex: 1, paddingHorizontal: 20, justifyContent: "center" }}
      >
        <Button
          title="Xác Nhận"
          variant={ButtonVariant.Contained}
          options={{ onPress: handleTakePicture }}
          loading={verifyMutation.isPending || idReadMutation.isPending}
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
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
});
