import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { primaryColor } from "src/util/constants";

export default function Status() {
  const { type, isConnected } = useNetInfo();

  const clickDetailNetwork = () => {
    const message = isConnected
      ? "Không phát hiện vấn đề nào trong 5 phút vừa qua."
      : "Điện thoại của bạn đang ngoại tuyến. \n\n Để khắc phục tình trạng mạng, bạn có thể thử \n \t\t \u25CF Đổi điện thoại sang một mạng WiFi khác \n \t\t \u25CF Thay đổi vị trí vật lý của bạn \n \t\t \u25CF Bật rồi tắt chế độ Máy bay \n \t\t \u25CF Reset lại mạng của bạn. \n \t\t \u25CF Bật VPN";
    Alert.alert(
      "",
      message,
      [
        {
          text: "Close",
        },
      ],
      { cancelable: true }
    );
  };

  const clickAppDetail = () => {
    const message = isConnected
      ? "Ứng dụng hiện đang hoạt động bình thường."
      : "Đã có lỗi xảy ra.";

    Alert.alert(
      "",
      message,
      [
        {
          text: "Close",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section}>
        <View>
          <View style={styles.statusTitleContainer}>
            <Text style={styles.statusTitle}>Kết Nối Mạng</Text>
            <FontAwesome
              name="circle"
              size={12}
              color={isConnected ? "green" : "red"}
            />
          </View>
          <Text style={styles.statusDes}>
            {isConnected ? "Good" : "Offline"}
          </Text>
          {isConnected ? (
            <Text>Kết nối {type}</Text>
          ) : (
            <Text>Not connected</Text>
          )}
        </View>

        <TouchableOpacity
          style={styles.detailBtn}
          onPress={() => clickDetailNetwork()}
        >
          <Text style={styles.detailText}>Chi Tiết</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <View>
          <View style={styles.statusTitleContainer}>
            <Text style={styles.statusTitle}>Tình Trạng App</Text>
            <FontAwesome
              name="circle"
              size={12}
              color={isConnected ? "green" : "red"}
            />
          </View>
          <Text style={styles.statusDes}>{isConnected ? "Good" : "Bad"}</Text>
        </View>

        <TouchableOpacity
          style={styles.detailBtn}
          onPress={() => clickAppDetail()}
        >
          <Text style={styles.detailText}>Chi Tiết</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFC",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  statusTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: "500",
  },
  statusDes: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "500",
  },
  detailBtn: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  detailText: { fontWeight: "600", color: primaryColor },
});
