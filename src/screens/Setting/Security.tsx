import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  //   ActivityIndicator,
} from "react-native";
import { HelperText, TextInput } from "react-native-paper";
import {
  passwordPattern,
  primaryColor,
  secondaryColor,
} from "src/util/constants";

function Security() {
  const [pwVerified, setPWVerified] = useState(false);
  const [showCurrentPW, setShowCurrentPW] = useState(true);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ currentPW: string }>();

  const onSubmit: SubmitHandler<{ currentPW: string }> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <SafeAreaView style={styles.container}>
      {pwVerified ? (
        <ChangePW setPWVerified={setPWVerified} />
      ) : (
        <View style={styles.form}>
          <Text style={{ fontWeight: "600", fontSize: 16 }}>
            Xác Nhận Mật Khẩu
          </Text>
          <View style={{ marginBottom: 16, marginTop: 12 }}>
            <Controller
              control={control}
              rules={{
                required: "* Vui lòng nhập mật khẩu",
                pattern: {
                  value: passwordPattern,
                  message: "* Mật khẩu không hợp lệ",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  label=""
                  mode="outlined"
                  activeOutlineColor="black"
                  placeholder="Mật khẩu hiện tại"
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry={!showCurrentPW}
                  right={
                    <TextInput.Icon
                      color={"gray"}
                      icon={showCurrentPW ? "eye-off" : "eye"}
                      onPress={() => setShowCurrentPW(!showCurrentPW)}
                    />
                  }
                />
              )}
              name="currentPW"
            />
            {errors.currentPW && (
              <HelperText type="error">{errors.currentPW.message}</HelperText>
            )}
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              //   verifyPWMutation.isPending ? { backgroundColor: "#ff9c60" } : {},
            ]}
            // disabled={verifyPWMutation.isPending}
            onPress={handleSubmit(onSubmit)}
          >
            {/* {verifyPWMutation.isPending && (
              <ActivityIndicator color={"white"} />
            )} */}
            <Text style={styles.btnText}>Tiếp Tục</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

interface Inputs {
  confirmNewPassword: string;

  newPassword: string;
}

const ChangePW = (props: IChangePWProps) => {
  const { setPWVerified } = props;

  const [showNewPW, setShowNewPW] = useState(true);
  const [showConfirmPW, setShowConfirmPW] = useState(true);

  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const password = watch("newPassword", "");

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    setPWVerified(true);
  };

  return (
    <View style={styles.form}>
      <Text style={{ fontWeight: "600", fontSize: 16 }}>Đổi Mật Khẩu</Text>

      <View style={{ marginBottom: 16, marginTop: 12 }}>
        <Controller
          control={control}
          rules={{
            required: "* Vui lòng nhập mật khẩu",
            pattern: {
              value: passwordPattern,
              message: "* Mật khẩu không hợp lệ",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label=""
              mode="outlined"
              activeOutlineColor="black"
              placeholder="Mật khẩu mới"
              placeholderTextColor={secondaryColor}
              style={styles.input}
              value={value}
              onChangeText={onChange}
              secureTextEntry={!showNewPW}
              right={
                <TextInput.Icon
                  color={"gray"}
                  icon={showNewPW ? "eye-off" : "eye"}
                  onPress={() => setShowNewPW(!showNewPW)}
                />
              }
            />
          )}
          name="newPassword"
        />
        {errors.newPassword && (
          <HelperText type="error">{errors.newPassword.message}</HelperText>
        )}
      </View>

      <View style={{ marginBottom: 16, marginTop: 12 }}>
        <Controller
          control={control}
          rules={{
            required: "* Vui lòng xác nhận mật khẩu",
            validate: (value) => {
              if (value !== password) return "* Mật khẩu không khớp";
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label=""
              mode="outlined"
              activeOutlineColor="black"
              placeholder="Xác nhận mật khẩu"
              placeholderTextColor={secondaryColor}
              style={styles.input}
              value={value}
              onChangeText={onChange}
              secureTextEntry={!showConfirmPW}
              right={
                <TextInput.Icon
                  color={"gray"}
                  icon={showConfirmPW ? "eye-off" : "eye"}
                  onPress={() => setShowConfirmPW(!showConfirmPW)}
                />
              }
            />
          )}
          name="confirmNewPassword"
        />
        {errors.confirmNewPassword && (
          <HelperText type="error">
            {errors.confirmNewPassword.message}
          </HelperText>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFC",
    paddingHorizontal: 16,
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
    width: 200,
  },
  btnText: {
    textAlign: "center",
    fontWeight: "800",
    color: "white",
    fontSize: 18,
  },
  form: {
    marginTop: 24,
    marginBottom: 12,
  },
});

export default Security;
