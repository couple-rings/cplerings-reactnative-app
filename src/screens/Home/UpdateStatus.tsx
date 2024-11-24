import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import Status from "src/components/card/Status";
import { primaryColor, secondaryColor } from "src/util/constants";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getTransportOrderDetail,
  postCreateNote,
} from "src/services/transportOrder.service";
import {
  // fetchTransportNotes,
  fetchTransportOrderDetail,
} from "src/util/querykey";
import Toast from "react-native-toast-message";
import { TransportOrderStatus } from "src/util/enums";

interface Inputs {
  note: string;
}

export default function UpdateStatus() {
  const [order, setOrder] = useState<ITransportOrder | null>(null);

  const { params } = useRoute<RouteProp<HomeStackParamList, "UpdateStatus">>();

  const { orderId } = params;

  const queryClient = useQueryClient();

  const { data: orderResponse, isLoading } = useQuery({
    queryKey: [fetchTransportOrderDetail, orderId],

    queryFn: () => {
      return getTransportOrderDetail(orderId);
    },
    enabled: orderId !== 0,
  });

  const noteMutation = useMutation({
    mutationFn: (data: ICreateNoteRequest) => {
      return postCreateNote(data);
    },
    onSuccess: (response) => {
      if (response.data) {
        queryClient.invalidateQueries({
          queryKey: [fetchTransportOrderDetail, orderId],
        });

        Toast.show({
          type: "success",
          text1: "Tạo ghi chú thành công",
        });

        reset();
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

  const {
    reset,
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
    noteMutation.mutate({ transportationOrderId: orderId, note: data.note });
  };

  useEffect(() => {
    if (orderResponse?.data) {
      setOrder(orderResponse.data.transportationOrder);
    }
  }, [orderResponse]);

  if (isLoading)
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={50} color={primaryColor} />
      </View>
    );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.head}>
        <MaterialCommunityIcons
          name="note-text"
          size={24}
          color={secondaryColor}
        />
        <Text style={styles.title}>Thông Tin Cập Nhật</Text>
      </View>

      {order?.transportationNotes.map((item) => {
        return <Status key={item.id} {...item} pressStatus={pressStatus} />;
      })}

      {order?.transportationNotes.length === 0 && (
        <Text style={styles.empty}>Chưa cập nhật thông tin nào</Text>
      )}

      {order?.status === TransportOrderStatus.Delivering && (
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
            loading={noteMutation.isPending}
          >
            Xác Nhận
          </RnpButton>
        </Card>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  list: {
    padding: 16,
  },
  empty: {
    textAlign: "center",
    marginVertical: 36,
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
    paddingHorizontal: 16,
  },
  cardContent: {
    backgroundColor: "white",
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  textInput: {
    paddingVertical: 12,
    marginBottom: 6,
    backgroundColor: "white",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
