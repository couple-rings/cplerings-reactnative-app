import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  //   ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { HelperText, TextInput } from "react-native-paper";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useAppSelector } from "src/util/hooks";
import { primaryColor, secondaryColor } from "src/util/constants";
import { appendDataTypeBase64 } from "src/util/functions";

const defaultImg = require("assets/default.jpg");

interface Inputs {
  username: string;

  phone: string;
}

function Profile() {
  const { username, email, phone, avatar } = useAppSelector(
    (state) => state.auth.userInfo
  );

  const [image, setImage] = useState(avatar);
  const [imageData, setImageData] = useState({
    base64: "",
    mimeType: "",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      phone,
      username,
    },
  });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      const { base64, mimeType } = result.assets[0];

      setImage(result.assets[0].uri);
      if (base64)
        setImageData({
          base64,
          mimeType: mimeType ? mimeType : "image/png",
        });
    }
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { base64, mimeType } = imageData;
    console.log(data);
    const base64Data = appendDataTypeBase64(base64, mimeType);
    console.log(base64Data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Public profile</Text>
          <Text style={styles.headerSubTitle}>
            Add information about yourself
          </Text>

          <View style={styles.imageContainer}>
            <Text style={{ fontWeight: "600" }}>Image preview</Text>
            {image ? (
              <Image
                source={{ uri: image }}
                resizeMode="contain"
                style={styles.image}
              />
            ) : (
              <Image
                source={defaultImg}
                resizeMode="contain"
                style={styles.image}
              />
            )}

            <TouchableOpacity
              style={styles.buttonUpload}
              onPress={() => pickImage()}
            >
              <Text style={styles.btnUploadText}>Upload image</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.body}>
          <Text style={{ fontWeight: "600", marginBottom: 12 }}>Basic</Text>
          <View style={{ marginBottom: 16 }}>
            <TextInput
              label="Email"
              mode="outlined"
              activeOutlineColor="black"
              style={styles.input}
              value={email}
              readOnly
            />
          </View>

          <View style={{ marginBottom: 16 }}>
            <Controller
              control={control}
              rules={{
                required: "* Username không được bỏ trống",
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="Username"
                  placeholderTextColor={secondaryColor}
                  mode="outlined"
                  activeOutlineColor="black"
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                />
              )}
              name="username"
            />
            {errors.username && (
              <HelperText type="error">{errors.username.message}</HelperText>
            )}
          </View>

          <View style={{ marginBottom: 16 }}>
            <Controller
              control={control}
              rules={{
                required: "* Số điện thoại không được bỏ trống",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "* Số điện thoại không hợp lệ",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholderTextColor={secondaryColor}
                  keyboardType="phone-pad"
                  mode="outlined"
                  activeOutlineColor="black"
                  placeholder="Phone number"
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                />
              )}
              name="phone"
            />
            {errors.phone && (
              <HelperText type="error">{errors.phone.message}</HelperText>
            )}
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              //   mutation.isPending ? { backgroundColor: "#ff9c60" } : {},
            ]}
            // disabled={mutation.isPending}
            onPress={handleSubmit(onSubmit)}
          >
            {/* {mutation.isPending && <ActivityIndicator color={"white"} />} */}
            <Text style={styles.btnText}>Xác Nhận</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFC",
    paddingHorizontal: 16,
  },
  header: {
    alignItems: "center",
    marginTop: 24,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "500",
    marginBottom: 3,
  },
  headerSubTitle: {
    fontSize: 16,
    color: "gray",
  },
  imageContainer: {
    marginVertical: 20,
  },
  image: {
    width: 330,
    height: 230,
    borderWidth: 0.5,
    borderColor: "black",
    marginTop: 8,
    alignSelf: "center",
  },
  buttonUpload: {
    paddingVertical: 16,
    marginVertical: 12,
    borderColor: "black",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
  btnUploadText: {
    textAlign: "center",
    fontWeight: "500",
    fontSize: 16,
  },
  body: {
    paddingHorizontal: 15,
    marginBottom: 24,
  },
  input: {
    backgroundColor: "#FAFAFC",
  },
  button: {
    paddingVertical: 12,
    backgroundColor: primaryColor,
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    width: 150,
  },
  btnText: {
    textAlign: "center",
    fontWeight: "800",
    color: "white",
    fontSize: 18,
  },
});

export default Profile;
