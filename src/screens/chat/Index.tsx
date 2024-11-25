import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Conversation from "src/components/chat/Conversation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "src/util/hooks";
import {
  getConversations,
  putUpdateConversation,
} from "src/services/conversation.service";
import { primaryColor } from "src/util/constants";
import { socket } from "src/config/socket";
import { saveNotifications } from "src/redux/slices/conversation.slice";
import { fetchConversations } from "src/util/querykey";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export default function ConversationList() {
  const [firstRender, setFirstRender] = useState(true);

  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const navigation = useNavigation<NavigationProp<ChatStackParamList>>();

  const { id: userId } = useAppSelector((state) => state.auth.userInfo);
  const { notificationList, currentConversation } = useAppSelector(
    (state) => state.conversation
  );

  const { _id } = currentConversation;

  const { data: response, isLoading } = useQuery({
    queryKey: [fetchConversations, userId],
    queryFn: () => {
      return getConversations({ userId });
    },
    enabled: !!userId,
  });

  const joinRooms = (rooms: string[]) => {
    socket.emit("join_room", rooms, (response: string) =>
      console.log(response)
    );
  };

  useEffect(() => {
    if (response && response.statusCode === 200 && response.data) {
      if (firstRender) {
        const rooms = response.data.map((conversation) => conversation._id);
        joinRooms(rooms);

        const notificationList: string[] = [];
        response.data.forEach((conversation) => {
          if (
            conversation.notifiedUsers &&
            conversation.notifiedUsers.includes(userId)
          )
            notificationList.push(conversation._id);
        });

        dispatch(saveNotifications(notificationList));

        setFirstRender(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  useEffect(() => {
    const listener = async (data: IMessage) => {
      if (!notificationList.includes(data.conversationId)) {
        // if currently in conversation list screen or in chat screen but new message does not belongs to the current conversation
        if (
          !currentConversation._id ||
          (currentConversation._id &&
            currentConversation._id !== data.conversationId)
        ) {
          dispatch(
            saveNotifications([...notificationList, data.conversationId])
          );

          putUpdateConversation(data.conversationId, { userId });
        }
      }

      queryClient.invalidateQueries({
        queryKey: [fetchConversations, userId],
      });
    };
    socket.on("receive_message", listener);

    return () => {
      socket.off("receive_message", listener);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentConversation, notificationList]);

  useEffect(() => {
    if (_id) {
      navigation.navigate("Chat", { conversationId: _id });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_id]);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && (
        <View style={styles.loading}>
          <ActivityIndicator color={primaryColor} size={50} />
        </View>
      )}
      {response && response.data && (
        <FlatList
          data={response.data}
          renderItem={({ item }) => <Conversation conversation={item} />}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={styles.empty}>Bạn chưa có hội thoại nào</Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: {
    paddingVertical: 12,
  },
  empty: {
    textAlign: "center",
    marginTop: 30,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
  },
});
