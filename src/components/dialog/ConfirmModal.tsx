import { StyleSheet, View } from "react-native";
import { Button, Dialog, Modal, Portal, Text } from "react-native-paper";
import { primaryColor, secondaryColor } from "src/util/constants";

export default function ConfirmModal(props: IConfirmModalProps) {
  const { message, title, setVisible, visible } = props;

  const hideModal = () => setVisible(false);

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
