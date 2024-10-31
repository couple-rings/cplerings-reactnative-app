import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { emailPattern, primaryColor, secondaryColor } from "src/util/constants";
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { TextInput } from "react-native-paper";
import Button from "src/components/button/Button";
import { ButtonVariant } from "src/util/enums";
import { NavigationProp, useNavigation } from "@react-navigation/native";

interface Inputs {
  email: string;
}

export default function ForgetPassword() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onInvalid: SubmitErrorHandler<Inputs> = (errors) => {
    if (errors.email && errors.email.ref && errors.email.ref.focus)
      errors.email.ref.focus();
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { email } = data;
    navigation.navigate("ResetPassword", { email });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <Text style={styles.title}>Quên Mật Khẩu?</Text>
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
      </View>

      <View style={styles.buttonContainer}>
        <Button
          variant={ButtonVariant.Contained}
          title="Xác Nhận"
          options={{ onPress: handleSubmit(onSubmit, onInvalid) }}
        />
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.backText}>Quay lại</Text>
        </TouchableOpacity>
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
    justifyContent: "center",
  },
  errorText: {
    color: "red",
    marginTop: 8,
  },
  buttonContainer: {
    width: "100%",
    flex: 1.5,
  },
  backBtn: {
    marginTop: 24,
  },
  backText: {
    textAlign: "center",
    color: secondaryColor,
    fontSize: 16,
  },
});
