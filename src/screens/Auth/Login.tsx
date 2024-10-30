import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  emailPattern,
  passwordPattern,
  primaryColor,
} from "src/util/constants";
import { TextInput } from "react-native-paper";
import Button from "src/components/button/Button";
import { ButtonVariant } from "src/util/enums";
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";

interface Inputs {
  email: string;
  password: string;
}

export default function Login() {
  const [showPW, setShowPW] = useState(true);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onInvalid: SubmitErrorHandler<Inputs> = (errors) => {
    if (errors.email && errors.email.ref && errors.email.ref.focus)
      errors.email.ref.focus();
    if (errors.password && errors.password.ref && errors.password.ref.focus)
      errors.password.ref.focus();
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={styles.title}>Đăng Nhập Vào Tài Khoản</Text>
      </View>

      <View style={styles.form}>
        <Controller
          name="email"
          control={control}
          rules={{
            required: "* Vui lòng nhập email",
            pattern: {
              value: emailPattern,
              message: "* Email không hợp lệ",
            },
          }}
          render={({ field: { value, onChange, ref } }) => (
            <TextInput
              error={!!errors.email}
              mode="outlined"
              placeholder="Email"
              placeholderTextColor={errors.email ? "red" : "#A8A7A7"}
              style={{ backgroundColor: errors.email ? "white" : "#EAEAEA" }}
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
        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}

        <Controller
          name="password"
          control={control}
          rules={{
            required: "* Vui lòng nhập mật khẩu",
            pattern: {
              value: passwordPattern,
              message: "* Mật khẩu không hợp lệ",
            },
          }}
          render={({ field: { onChange, value, ref } }) => (
            <TextInput
              error={!!errors.password}
              secureTextEntry={!showPW}
              mode="outlined"
              placeholder="Mật Khẩu"
              placeholderTextColor={errors.password ? "red" : "#A8A7A7"}
              style={{
                backgroundColor: errors.password ? "white" : "#EAEAEA",
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
                  color={errors.password ? "red" : "#A8A7A7"}
                  icon={showPW ? "eye-off" : "eye"}
                  onPress={() => setShowPW(!showPW)}
                />
              }
              value={value}
              onChangeText={onChange}
              ref={ref}
            />
          )}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}

        <TouchableOpacity>
          <Text style={styles.forget}>Quên mật khẩu?</Text>
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.buttonContainer,
          { justifyContent: isKeyboardVisible ? "center" : "flex-start" },
        ]}
      >
        <Button
          variant={ButtonVariant.Contained}
          title="Đăng Nhập"
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
    flex: 1.5,
    width: "100%",
    justifyContent: "flex-start",
  },
  forget: {
    textAlign: "right",
    color: "#A8A7A7",
    fontSize: 16,
    marginTop: 12,
  },
  buttonContainer: {
    width: "100%",
    flex: 1.5,
  },
  errorText: {
    color: "red",
    marginTop: 8,
  },
});
