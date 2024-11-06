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
import {
  acceptedImage,
  attachmentMimeType,
  primaryColor,
} from "src/util/constants";
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { socket } from "src/config/socket";
import { unSelectConversation } from "src/redux/slices/conversation.slice";
import { IconButton, TextInput } from "react-native-paper";
import moment from "moment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import { Buffer } from "buffer";
import { FileType } from "src/util/enums";
import Toast from "react-native-toast-message";
import {
  postUploadAttachment,
  postUploadImage,
} from "src/services/file.service";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

export default function Chat() {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const previousAction = useRef("");

  const navigation = useNavigation<NavigationProp<ChatStackParamList>>();
  const listRef = useRef<FlatList>(null);

  const { id: userId } = useAppSelector((state) => state.auth.userInfo);
  const { messagesList } = useAppSelector((state) => state.message);
  const { currentConversation } = useAppSelector((state) => state.conversation);

  const { _id } = currentConversation;

  const imageMutation = useMutation({
    mutationFn: (data: IUploadImageRequest) => {
      return postUploadImage(data);
    },
    onSuccess: (response, request) => {
      if (response.data) {
        handleSubmitFile(response.data, FileType.Image);
      } else {
        Toast.show({
          type: "error",
          text1: "Có lỗi xảy ra khi tải ảnh lên",
        });
        console.log(response.error);
      }
    },
  });

  const attachmentMutation = useMutation({
    mutationFn: (data: IUploadAttachmentRequest) => {
      return postUploadAttachment(data);
    },
    onSuccess: (response, request) => {
      console.log(response);
      if (response.data) {
        handleSubmitFile(response.data, FileType.Attachment);
      } else {
        Toast.show({
          type: "error",
          text1: "Có lỗi xảy ra khi tải file lên",
        });
        console.log(response.error);
      }
    },
  });

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
          previousAction.current = "load_more_messages";
        }
      }
    }
  };

  const scrollToEnd = (index: number) => {
    if (previousAction.current === "enter_new_message") {
      setTimeout(() => {
        listRef.current?.scrollToIndex({ index });
      }, 200);
    }
  };

  const handleSend = (message: IMessage) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    socket.emit("send_message", message, async (response: any) => {
      if (response) {
        queryClient.invalidateQueries({
          queryKey: ["fetchConversations", userId],
        });
      }
    });
  };

  const handleSubmitText = () => {
    if (!message) return;

    const newMessage: IMessage = {
      sender: userId,
      content: message,
      conversationId: _id,
      sentAt: moment().toISOString(),
    };

    handleSend(newMessage);
    dispatch(saveMessages([...messagesList, newMessage]));
    previousAction.current = "enter_new_message";
    setMessage("");
  };

  const handleSubmitFile = (file: IFile, type: string) => {
    const newMessage: IMessage = {
      sender: userId,
      content: type,
      conversationId: _id,
      sentAt: moment().toISOString(),
    };

    if (type === FileType.Image) {
      newMessage.imageId = file;
    }

    if (type === FileType.Attachment) {
      newMessage.attachmentId = file;
    }

    handleSend(newMessage);
    dispatch(saveMessages([...messagesList, newMessage]));
    previousAction.current = "enter_new_message";
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (
      !result.canceled &&
      result.assets[0].base64 &&
      result.assets[0].mimeType
    ) {
      const { base64, mimeType, uri } = result.assets[0];

      if (!acceptedImage.includes(mimeType)) {
        Toast.show({
          type: "error",
          text1: "Định dạng ảnh không hợp lệ",
        });
        return;
      }

      const data: IUploadImageRequest = {
        folderName: userId + "",
        type: FileType.Image,
        base64Image: {
          data: base64,
          mimetype: mimeType,
          name: uri.split("/").pop() as string,
          size: Buffer.from(base64, "base64").length,
        },
      };
      imageMutation.mutate(data);
    }
  };

  const pickAttachment = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: attachmentMimeType,
    });
    if (!result.canceled && result.assets) {
      const { uri, name, mimeType, size } = result.assets[0];

      if (mimeType && size) {
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: "base64",
        });

        const data: IUploadAttachmentRequest = {
          folderName: userId + "",
          type: FileType.Attachment,
          base64Attachment: {
            data: base64,
            mimetype: mimeType,
            name,
            size,
          },
        };
        attachmentMutation.mutate(data);
      }
    }
  };

  useEffect(() => {
    (async () => {
      const res = await getMessages({ conversationId: _id });

      if (res.statusCode === 200 && res.data) {
        dispatch(saveMessages(res.data.items));
        setCurrentPage(res.data.currentPage);

        setTimeout(() => {
          listRef.current?.scrollToEnd();
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
        previousAction.current = "enter_new_message";
        dispatch(saveMessages([...messagesList, data]));

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
          showsVerticalScrollIndicator={false}
          data={messagesList}
          contentContainerStyle={styles.list}
          renderItem={({ item, index }) => {
            const last = index === messagesList.length - 1;

            //text message of the other person
            if (item.sender !== userId && !item.imageId && !item.attachmentId)
              return (
                <PartnerMessage timestamp={item.sentAt}>
                  <TextMessage
                    content={item.content}
                    scrollToEnd={last ? () => scrollToEnd(index) : undefined}
                  />
                </PartnerMessage>
              );

            //image message of the other person
            if (item.sender !== userId && item.imageId)
              return (
                <PartnerMessage timestamp={item.sentAt} isImage={true}>
                  <ImageMessage
                    url={item.imageId.url}
                    scrollToEnd={last ? () => scrollToEnd(index) : undefined}
                  />
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
                    scrollToEnd={last ? () => scrollToEnd(index) : undefined}
                  />
                </PartnerMessage>
              );

            //text message of the author
            if (item.sender === userId && !item.imageId && !item.attachmentId)
              return (
                <OwnMessage timestamp={item.sentAt}>
                  <TextMessage
                    content={item.content}
                    scrollToEnd={last ? () => scrollToEnd(index) : undefined}
                  />
                </OwnMessage>
              );

            //image message of the author
            if (item.sender === userId && item.imageId)
              return (
                <OwnMessage timestamp={item.sentAt} isImage={true}>
                  <ImageMessage
                    url={item.imageId.url}
                    scrollToEnd={last ? () => scrollToEnd(index) : undefined}
                  />
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
                    scrollToEnd={last ? () => scrollToEnd(index) : undefined}
                  />
                </OwnMessage>
              );
            return <View></View>;
          }}
          keyExtractor={(item, index) => item._id + `${index}`}
        />
      )}

      {(imageMutation.isPending || attachmentMutation.isPending) && (
        <ActivityIndicator
          style={{ marginBottom: 24 }}
          size={30}
          color={primaryColor}
        />
      )}

      <View style={styles.bottom}>
        <TextInput
          mode="outlined"
          placeholder="Gửi tin nhắn..."
          style={styles.textInput}
          placeholderTextColor={"#888"}
          cursorColor={"#888"}
          textColor={"#888"}
          outlineColor="#D9D9D9"
          theme={{
            colors: {
              primary: "#D9D9D9",
            },
            roundness: 30,
          }}
          returnKeyType="send"
          value={message}
          onChangeText={(value) => setMessage(value)}
          onSubmitEditing={() => handleSubmitText()}
        />

        <IconButton
          icon="attachment"
          iconColor={"#888"}
          size={25}
          style={{ marginRight: 0 }}
          onPress={pickAttachment}
        />

        <IconButton
          icon="image"
          iconColor={"#888"}
          size={25}
          style={{ marginHorizontal: 0 }}
          onPress={pickImage}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
  },
  list: {
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  bottom: {
    backgroundColor: "#e3e3e3",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    backgroundColor: "#ebebeb",
    flex: 1,
  },
});
