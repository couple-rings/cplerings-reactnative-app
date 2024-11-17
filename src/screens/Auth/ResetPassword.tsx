import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { passwordPattern, primaryColor } from "src/util/constants";
import { RouteProp, useRoute } from "@react-navigation/native";
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { HelperText, TextInput } from "react-native-paper";
import Button from "src/components/button/Button";
import { ButtonVariant } from "src/util/enums";
import { useKeyboardDetect } from "src/util/hooks";

interface Inputs {
  newPassword: string;
  cfnPassword: string;
  otp: string;
}

export default function ResetPassword() {
  const [showNewPW, setShowNewPW] = useState(true);
  const [showCfnPassword, setShowCfnPassword] = useState(false);

  const { params } = useRoute<RouteProp<RootStackParamList, "ResetPassword">>();
  const { email } = params;
  console.log(email);

  const isKeyboardVisible = useKeyboardDetect();

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Inputs>();

  const onInvalid: SubmitErrorHandler<Inputs> = (errors) => {
    if (
      errors.newPassword &&
      errors.newPassword.ref &&
      errors.newPassword.ref.focus
    )
      errors.newPassword.ref.focus();

    if (
      errors.cfnPassword &&
      errors.cfnPassword.ref &&
      errors.cfnPassword.ref.focus
    )
      errors.cfnPassword.ref.focus();

    if (errors.otp && errors.otp.ref && errors.otp.ref.focus)
      errors.otp.ref.focus();
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={styles.title}>Đổi Mật Khẩu</Text>
      </View>

      <View style={[styles.form, { flex: isKeyboardVisible ? 6 : 1.8 }]}>
        <Controller
          name="newPassword"
          control={control}
          rules={{
            required: "* Vui lòng nhập mật khẩu mới",
            pattern: {
              value: passwordPattern,
              message: "* Mật khẩu không hợp lệ",
            },
          }}
          render={({ field: { onChange, value, ref } }) => (
            <TextInput
              error={!!errors.newPassword}
              secureTextEntry={!showNewPW}
              mode="outlined"
              placeholder="Mật Khẩu"
              placeholderTextColor={errors.newPassword ? "red" : "#A8A7A7"}
              style={{
                backgroundColor: errors.newPassword ? "white" : "#EAEAEA",
                marginTop: 24,
              }}
              cursorColor={primaryColor}
              textColor={primaryColor}
              outlineColor="transparent"
              theme={{
                colors: {
                  primary: "transparent",
                },
              }}
              right={
                <TextInput.Icon
                  color={errors.newPassword ? "red" : "#A8A7A7"}
                  icon={showNewPW ? "eye-off" : "eye"}
                  onPress={() => setShowNewPW(!showNewPW)}
                />
              }
              value={value}
              onChangeText={onChange}
              ref={ref}
            />
          )}
        />
        {errors.newPassword && (
          <HelperText type="error">{errors.newPassword.message}</HelperText>
        )}

        <Controller
          name="cfnPassword"
          control={control}
          rules={{
            required: "* Vui lòng xác nhận mật khẩu",
            validate: (value) => {
              const { newPassword } = getValues();
              if (value === newPassword) {
                return true;
              } else {
                return "Mật khẩu xác nhận không chính xác";
              }
            },
          }}
          render={({ field: { onChange, value, ref } }) => (
            <TextInput
              error={!!errors.cfnPassword}
              secureTextEntry={!showCfnPassword}
              mode="outlined"
              placeholder="Xác Nhận Mật Khẩu"
              placeholderTextColor={errors.cfnPassword ? "red" : "#A8A7A7"}
              style={{
                backgroundColor: errors.cfnPassword ? "white" : "#EAEAEA",
                marginTop: 24,
              }}
              cursorColor={primaryColor}
              textColor={primaryColor}
              outlineColor="transparent"
              theme={{
                colors: {
                  primary: "transparent",
                },
              }}
              right={
                <TextInput.Icon
                  color={errors.cfnPassword ? "red" : "#A8A7A7"}
                  icon={showCfnPassword ? "eye-off" : "eye"}
                  onPress={() => setShowCfnPassword(!showCfnPassword)}
                />
              }
              value={value}
              onChangeText={onChange}
              ref={ref}
            />
          )}
        />
        {errors.cfnPassword && (
          <HelperText type="error">{errors.cfnPassword.message}</HelperText>
        )}

        <Controller
          name="otp"
          control={control}
          rules={{
            required: "* Vui lòng nhập mã OTP",
          }}
          render={({ field: { value, onChange, ref } }) => (
            <TextInput
              error={!!errors.otp}
              mode="outlined"
              placeholder="Mã OTP"
              placeholderTextColor={errors.otp ? "red" : "#A8A7A7"}
              style={{
                backgroundColor: errors.otp ? "white" : "#EAEAEA",
                marginTop: 24,
              }}
              cursorColor={primaryColor}
              textColor={primaryColor}
              outlineColor="transparent"
              theme={{
                colors: {
                  primary: "transparent",
                },
              }}
              value={value}
              onChangeText={onChange}
              ref={ref}
            />
          )}
        />
        {errors.otp && (
          <HelperText type="error">{errors.otp.message}</HelperText>
        )}
      </View>

      <View
        style={[
          styles.buttonContainer,
          { justifyContent: isKeyboardVisible ? "center" : "flex-start" },
        ]}
      >
        <Button
          variant={ButtonVariant.Contained}
          title="Xác Nhận"
          options={{ onPress: handleSubmit(onSubmit, onInvalid) }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 32,
  },
  title: {
    color: primaryColor,
    fontSize: 32,
    fontWeight: "500",
    textAlign: "center",
  },
  form: {
    width: "100%",
    justifyContent: "flex-start",
  },
  buttonContainer: {
    width: "100%",
    flex: 1,
  },
});
