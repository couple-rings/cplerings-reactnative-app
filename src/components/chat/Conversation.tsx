import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import moment from "moment";
import { primaryColor, secondaryColor } from "src/util/constants";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useAppDispatch, useAppSelector } from "src/util/hooks";
import {
  saveNotifications,
  selectConversation,
} from "src/redux/slices/conversation.slice";
import { putUpdateConversation } from "src/services/conversation.service";
import { putUpdateMessage } from "src/services/message.service";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import { fetchConversations } from "src/util/querykey";

const avatar = require("assets/male-icon.png");

export default function Conversation(props: IConversationProps) {
  const { conversation } = props;

  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const navigation = useNavigation<NavigationProp<ChatStackParamList>>();

  const { id: userId } = useAppSelector((state) => state.auth.userInfo);
  const { notificationList } = useAppSelector((state) => state.conversation);

  const handleClickConversation = async () => {
    dispatch(selectConversation(conversation));

    //remove notification for this conversation after read
    const found = notificationList.find((item) => item === conversation._id);
    if (found) {
      const newNotifications = notificationList.filter(
        (item) => item !== conversation._id
      );
      dispatch(saveNotifications(newNotifications));

      putUpdateConversation(conversation._id, { userId });
    }

    // update read status of last message to true when click on conversation
    const latestMessage = conversation.latestMessage;
    if (
      latestMessage &&
      latestMessage.sender !== userId &&
      !latestMessage.read
    ) {
      if (latestMessage._id)
        await putUpdateMessage(latestMessage._id, { read: true });

      queryClient.invalidateQueries({
        queryKey: [fetchConversations, userId],
      });
    }

    navigation.navigate("Chat");
  };

  const renderLatestMsg = (message: IMessage | undefined) => {
    if (!message) return "Bạn có thể bắt đầu trò chuyện với người này";

    const notified =
      notificationList.includes(message.conversationId) ||
      (message.sender !== userId && !message.read);

    if (message.imageId)
      return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={notified ? styles.notified : {}}>
            {message.sender === userId ? "Bạn" : message.sender}:{" "}
          </Text>
          <MaterialIcons
            name="image"
            size={20}
            color={notified ? "black" : secondaryColor}
          />
          <Text style={[notified ? styles.notified : {}, styles.mediaMessage]}>
            Hình ảnh
          </Text>
        </View>
      );

    if (message.attachmentId)
      return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={notified ? styles.notified : {}}>
            {message.sender === userId ? "Bạn" : message.sender}:{" "}
          </Text>
          <MaterialCommunityIcons
            name="attachment"
            size={20}
            color={notified ? "black" : secondaryColor}
          />
          <Text
            style={[notified ? styles.notified : {}, styles.mediaMessage]}
            numberOfLines={1}
          >
            {message.attachmentId.originalName}
          </Text>
        </View>
      );

    return (
      <Text style={notified ? styles.notified : {}}>
        {message.sender === userId ? "Bạn" : message.sender}: {message.content}
      </Text>
    );
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleClickConversation}
    >
      <Image source={avatar} style={styles.avatar} />

      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View>
          <View style={styles.upper}>
            <Text style={styles.name}>
              {conversation.participants.find((user) => user !== userId)}
            </Text>

            {notificationList.includes(conversation._id) && (
              <MaterialIcons
                name="notifications"
                size={24}
                color={primaryColor}
              />
            )}
          </View>

          <View style={styles.bottom}>
            <View style={{ flex: 1 }}>
              <Text style={styles.message} numberOfLines={1}>
                {renderLatestMsg(conversation.latestMessage)}
              </Text>
            </View>

            {conversation.latestMessage && (
              <Text style={styles.date}>
                {moment(conversation.latestMessage.sentAt).format("DD/MM/YYYY")}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.hr}></View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    gap: 25,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: "#ccc",
  },
  name: {
    fontSize: 16,
    color: secondaryColor,
    fontWeight: "500",
  },
  date: {
    color: secondaryColor,
    fontSize: 12,
  },
  message: {
    color: secondaryColor,
  },
  mediaMessage: {
    marginLeft: 3,
    width: 120,
  },
  notified: {
    fontWeight: "600",
    color: "black",
  },
  upper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  hr: {
    borderBottomColor: secondaryColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
