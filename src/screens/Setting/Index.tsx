import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "src/util/hooks";
import { primaryColor } from "src/util/constants";
import { logout } from "src/redux/slices/auth.slice";
import { removeConversations } from "src/redux/slices/conversation.slice";
import { removeMessages } from "src/redux/slices/message.slice";
import { NavigationProp, useNavigation } from "@react-navigation/native";
const defaultImg = require("assets/default.jpg");

export default function Setting() {
  const navigation = useNavigation<NavigationProp<SettingStackParamList>>();

  const dispatch = useAppDispatch();

  const { avatar, email, username } = useAppSelector(
    (state) => state.auth.userInfo
  );

  const handleLogout = () => {
    dispatch(removeConversations());
    dispatch(removeMessages());
    dispatch(logout());
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.userInfo}>
          <Avatar.Image
            size={130}
            source={avatar ? { uri: avatar } : defaultImg}
          />
          <Text style={styles.username}>{username}</Text>

          <View style={styles.emailContainer}>
            <Fontisto name="email" size={22} color="black" />
            <Text style={{ fontSize: 16 }}>{email}</Text>
          </View>
        </View>

        <View style={styles.subContainer}>
          <Text style={styles.title}>Cài Đặt Tài Khoản</Text>

          <TouchableOpacity
            style={styles.section}
            onPress={() => navigation.navigate("Profile")}
          >
            <Text style={styles.sectionTitle}>Thông Tin Cá Nhân</Text>
            <AntDesign name="right" size={18} color="#C1C0C8" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.section}
            onPress={() => navigation.navigate("Security")}
          >
            <Text style={styles.sectionTitle}>Bảo Mật</Text>
            <AntDesign name="right" size={18} color="#C1C0C8" />
          </TouchableOpacity>
        </View>

        <View style={[styles.subContainer]}>
          <Text style={styles.title}>Điều Khoản và Hỗ Trợ</Text>

          <TouchableOpacity style={styles.section}>
            <Text style={styles.sectionTitle}>Điều Khoản</Text>
            <AntDesign name="right" size={18} color="#C1C0C8" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.section}>
            <Text style={styles.sectionTitle}>Chính Sách Bảo Mật</Text>
            <AntDesign name="right" size={18} color="#C1C0C8" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.section}>
            <Text style={styles.sectionTitle}>Hỗ Trợ</Text>
            <AntDesign name="right" size={18} color="#C1C0C8" />
          </TouchableOpacity>
        </View>

        <View style={styles.subContainer}>
          <Text style={styles.title}>Diagnostics</Text>

          <TouchableOpacity
            style={styles.section}
            onPress={() => navigation.navigate("Status")}
          >
            <Text style={styles.sectionTitle}>Trạng Thái</Text>
            <AntDesign name="right" size={18} color="#C1C0C8" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.signinBtn}
          onPress={handleLogout}
          // disabled={mutation.isPending}
        >
          {/* {mutation.isPending && (
              <ActivityIndicator size={16} color={"#ffa167"} />
            )} */}
          <Text
            style={[
              styles.btnText,
              // mutation.isPending ? { color: "#ffa167" } : {},
            ]}
          >
            Sign Out
          </Text>
        </TouchableOpacity>
        <Text style={styles.version}>Couple Rings v1.30.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAFAFC", paddingHorizontal: 16 },
  userInfo: {
    alignItems: "center",
    marginTop: 32,
    marginBottom: 40,
  },
  subContainer: {
    marginVertical: 12,
  },
  title: {
    color: "#444262",
    marginBottom: 12,
  },
  username: {
    fontSize: 22,
    fontWeight: "500",
    marginTop: 16,
  },
  emailContainer: {
    flexDirection: "row",
    gap: 8,
    marginTop: 3,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
  },
  signinBtn: {
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  btnText: {
    color: primaryColor,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
  version: {
    textAlign: "center",
    marginTop: 16,
    marginBottom: 12,
    color: "#83829A",
  },
});
