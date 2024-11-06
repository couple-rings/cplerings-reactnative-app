import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/util/hooks";
import OwnMessage from "src/components/chat/OwnMessage";
import TextMessage from "src/components/chat/TextMessage";
import PartnerMessage from "src/components/chat/PartnerMessage";
import ImageMessage from "src/components/chat/ImageMessage";
import AttachmentMessage from "src/components/chat/AttachmentMessage";
import { getMessages, putUpdateMessage } from "src/services/message.service";
import { saveMessages } from "src/redux/slices/message.slice";
import { primaryColor } from "src/util/constants";
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { socket } from "src/config/socket";
import { unSelectConversation } from "src/redux/slices/conversation.slice";

export default function Chat() {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();
  const previousAction = useRef("");

  const navigation = useNavigation<NavigationProp<ChatStackParamList>>();
  const listRef = useRef<FlatList>(null);

  const { id: userId } = useAppSelector((state) => state.auth.userInfo);
  const { messagesList } = useAppSelector((state) => state.message);
  const { currentConversation } = useAppSelector((state) => state.conversation);

  const { _id } = currentConversation;

  const handleScrollTop = async (offset: number) => {
    if (offset === 0) {
      const response = await getMessages({
        conversationId: _id,
        current: currentPage + 1,
      });
      if (response.statusCode === 200 && response.data) {
        const newMessages = response.data.items;
        if (newMessages.length > 0) {
          dispatch(saveMessages([...newMessages, ...messagesList]));
          setCurrentPage(response.data.currentPage);
        }
      }
    }
  };

  const onListChange = () => {
    if (previousAction.current === "enter_new_message") {
      listRef.current?.scrollToEnd();
    }
  };

  useEffect(() => {
    (async () => {
      const res = await getMessages({ conversationId: _id });

      if (res.statusCode === 200 && res.data) {
        dispatch(saveMessages(res.data.items));
        setCurrentPage(res.data.currentPage);

        setTimeout(() => {
          listRef.current?.scrollToEnd({ animated: false });
        }, 200);
      }

      setLoading(false);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const listener = async (data: IMessage) => {
      // if new message belongs to current conversation
      if (data.conversationId === _id) {
        dispatch(saveMessages([...messagesList, data]));
        previousAction.current = "enter_new_message";

        if (data._id) putUpdateMessage(data._id, { read: true });
      }
    };
    socket.on("receive_message", listener);

    return () => {
      socket.off("receive_message", listener);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messagesList]);

  // hide tab bar
  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: undefined,
      });
  }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused

      return () => {
        dispatch(unSelectConversation());
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator color={primaryColor} size={50} />
        </View>
      )}

      {!loading && (
        <FlatList
          onScroll={(e) => handleScrollTop(e.nativeEvent.contentOffset.y)}
          ref={listRef}
          onContentSizeChange={onListChange}
          showsVerticalScrollIndicator={false}
          data={messagesList}
          contentContainerStyle={{ paddingVertical: 24 }}
          renderItem={({ item }) => {
            //text message of the other person
            if (item.sender !== userId && !item.imageId && !item.attachmentId)
              return (
                <PartnerMessage timestamp={item.sentAt}>
                  <TextMessage content={item.content} />
                </PartnerMessage>
              );

            //image message of the other person
            if (item.sender !== userId && item.imageId)
              return (
                <PartnerMessage timestamp={item.sentAt} isImage={true}>
                  <ImageMessage url={item.imageId.url} />
                </PartnerMessage>
              );

            //attachment message of the other person
            if (item.sender !== userId && item.attachmentId)
              return (
                <PartnerMessage timestamp={item.sentAt}>
                  <AttachmentMessage
                    name={item.attachmentId.originalName}
                    url={item.attachmentId.url}
                    size={item.attachmentId.size}
                  />
                </PartnerMessage>
              );

            //text message of the author
            if (item.sender === userId && !item.imageId && !item.attachmentId)
              return (
                <OwnMessage timestamp={item.sentAt}>
                  <TextMessage content={item.content} />
                </OwnMessage>
              );

            //image message of the author
            if (item.sender === userId && item.imageId)
              return (
                <OwnMessage timestamp={item.sentAt} isImage={true}>
                  <ImageMessage url={item.imageId.url} />
                </OwnMessage>
              );

            //attachment message of the author
            if (item.sender === userId && item.attachmentId)
              return (
                <OwnMessage timestamp={item.sentAt}>
                  <AttachmentMessage
                    url={item.attachmentId.url}
                    name={item.attachmentId.originalName}
                    size={item.attachmentId.size}
                  />
                </OwnMessage>
              );
            return <View></View>;
          }}
          keyExtractor={(item) => item._id + ""}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
  },
});
