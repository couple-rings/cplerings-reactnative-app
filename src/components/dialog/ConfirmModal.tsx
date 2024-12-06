import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { StyleSheet, View } from "react-native";
import { Button, Dialog, Modal, Portal, Text } from "react-native-paper";
import Toast from "react-native-toast-message";
import { removeOrder } from "src/redux/slices/order.slice";
import {
  postCreateNote,
  putUpdateOrderStatus,
} from "src/services/transportOrder.service";
import {
  noteCompleteOrder,
  primaryColor,
  secondaryColor,
} from "src/util/constants";
import { FailReason, TransportOrderStatus } from "src/util/enums";
import { useAppDispatch, useAppSelector } from "src/util/hooks";
import { fetchTransportOrders } from "src/util/querykey";

export default function ConfirmModal(props: IConfirmModalProps) {
  const { message, title, setVisible, visible, note, reason } = props;

  const navigation = useNavigation<NavigationProp<RootTabParamList>>();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const { currentOrder } = useAppSelector((state) => state.order);

  const noteMutation = useMutation({
    mutationFn: (data: ICreateNoteRequest) => {
      return postCreateNote(data);
    },
    onSuccess: (response) => {
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

  const completeMutation = useMutation({
    mutationFn: (data: { id: number; status: TransportOrderStatus }) => {
      return putUpdateOrderStatus(data.id, data.status);
    },
    onSuccess: (response) => {
      if (response.data) {
        queryClient.invalidateQueries({
          queryKey: [fetchTransportOrders],
        });
        Toast.show({
          type: "success",
          text1: "Đơn đã được hoàn thành",
        });
        dispatch(removeOrder());
        navigation.navigate("HomeStack", { screen: "OrderList" });
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

  const cancelMutation = useMutation({
    mutationFn: (data: { id: number; status: TransportOrderStatus }) => {
      return putUpdateOrderStatus(data.id, data.status);
    },
    onSuccess: (response, request) => {
      if (response.data && note) {
        queryClient.invalidateQueries({
          queryKey: [fetchTransportOrders],
        });

        if (request.status === TransportOrderStatus.Rejected)
          Toast.show({
            type: "info",
            text1: "Xác nhận đơn hàng bị từ chối",
          });

        if (request.status === TransportOrderStatus.Waiting)
          Toast.show({
            type: "info",
            text1: "Đã chuyển đơn hàng về trạng thái chờ",
          });

        dispatch(removeOrder());
        navigation.navigate("HomeStack", { screen: "OrderList" });
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

  const hideModal = () => setVisible(false);

  const handleConfirm = () => {
    if (currentOrder !== 0 && !reason) {
      noteMutation.mutate({
        transportationOrderId: currentOrder,
        note: noteCompleteOrder,
      });
      completeMutation.mutate({
        id: currentOrder,
        status: TransportOrderStatus.Completed,
      });

      setVisible(false);
    }

    if (currentOrder !== 0 && reason === FailReason.Rejected && note) {
      noteMutation.mutate({ transportationOrderId: currentOrder, note });
      cancelMutation.mutate({
        id: currentOrder,
        status: TransportOrderStatus.Rejected,
      });
      setVisible(false);
    }

    if (currentOrder !== 0 && reason === FailReason.NotMet && note) {
      noteMutation.mutate({ transportationOrderId: currentOrder, note });
      cancelMutation.mutate({
        id: currentOrder,
        status: TransportOrderStatus.Waiting,
      });
      setVisible(false);
    }
  };

  return (
    <View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          dismissable={false}
          contentContainerStyle={styles.container}
        >
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
          </View>

          <View style={styles.body}>
            <Text style={styles.bodyText}>
              <Text style={styles.note}>Lưu ý</Text>: {message}
            </Text>
          </View>
          <Dialog.Actions>
            <Button
              mode="elevated"
              buttonColor="white"
              icon={"close-box"}
              textColor={secondaryColor}
              style={styles.button}
              onPress={hideModal}
            >
              Đóng
            </Button>
            <Button
              mode="elevated"
              buttonColor="white"
              icon={"checkbox-marked"}
              textColor={secondaryColor}
              style={styles.button}
              loading={completeMutation.isPending}
              onPress={handleConfirm}
            >
              Xác Nhận
            </Button>
          </Dialog.Actions>
        </Modal>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    margin: 20,
    borderRadius: 10,
  },
  header: {
    backgroundColor: primaryColor,
    paddingVertical: 16,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  title: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
  body: {
    padding: 20,
  },
  bodyText: {
    fontStyle: "italic",
    color: secondaryColor,
    fontSize: 16,
  },
  note: {
    color: "red",
    fontStyle: "italic",
  },
  button: {
    borderRadius: 10,
    marginTop: 10,
    width: "50%",
    borderColor: "#A8A7A7",
    borderWidth: 1,
  },
});
