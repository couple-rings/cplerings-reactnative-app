import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import moment from "moment";
import Status from "src/components/card/Status";
import { secondaryColor } from "src/util/constants";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  Card,
  HelperText,
  TextInput,
  Button as RnpButton,
} from "react-native-paper";
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";

interface Inputs {
  note: string;
}

const status = [
  {
    time: moment().format("HH:mm MMM Do YYYY"),
    note: "Update note",
  },
  {
    time: moment().format("HH:mm MMM Do YYYY"),
    note: "Update note",
  },
  {
    time: moment().format("HH:mm MMM Do YYYY"),
    note: "Update note",
  },
];

export default function UpdateStatus() {
  const { params } = useRoute<RouteProp<HomeStackParamList, "UpdateStatus">>();
  const { orderId } = params;

  console.log(orderId);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const pressStatus = (note: string) => {
    Alert.alert(
      "Thông Tin Chi Tiết",
      note,
      [
        {
          text: "Đóng",
        },
      ],
      { cancelable: true }
    );
  };

  const onInvalid: SubmitErrorHandler<Inputs> = (errors) => {
    if (errors.note && errors.note.ref && errors.note.ref.focus)
      errors.note.ref.focus();
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={status}
        renderItem={({ item }) => (
          <Status {...item} pressStatus={pressStatus} />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>Chưa cập nhật thông tin nào</Text>
        }
        ListHeaderComponent={
          <View style={styles.head}>
            <MaterialCommunityIcons
              name="note-text"
              size={24}
              color={secondaryColor}
            />
            <Text style={styles.title}>Thông Tin Cập Nhật</Text>
          </View>
        }
        ListFooterComponent={
          <Card style={styles.cardContent}>
            <Controller
              name="note"
              control={control}
              rules={{
                required: "* Vui lòng nhập thông tin",
              }}
              render={({ field: { value, onChange, ref } }) => (
                <TextInput
                  error={!!errors.note}
                  placeholder="Thông tin cụ thể..."
                  mode="outlined"
                  multiline
                  numberOfLines={5}
                  style={styles.textInput}
                  placeholderTextColor={errors.note ? "red" : secondaryColor}
                  cursorColor={secondaryColor}
                  textColor={secondaryColor}
                  outlineColor="#D9D9D9"
                  theme={{
                    colors: {
                      primary: secondaryColor,
                    },
                    roundness: 10,
                  }}
                  value={value}
                  onChangeText={onChange}
                  ref={ref}
                />
              )}
            />
            {errors.note && (
              <HelperText type="error">{errors.note.message}</HelperText>
            )}

            <RnpButton
              mode="elevated"
              buttonColor="white"
              textColor={secondaryColor}
              style={{ borderRadius: 10, marginVertical: 16 }}
              onPress={handleSubmit(onSubmit, onInvalid)}
            >
              Xác Nhận
            </RnpButton>
          </Card>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 16,
  },
  empty: {
    textAlign: "center",
    marginTop: 36,
    color: secondaryColor,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  head: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 20,
  },
  cardContent: {
    backgroundColor: "white",
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  textInput: {
    paddingVertical: 12,
    marginBottom: 6,
    backgroundColor: "white",
  },
});
