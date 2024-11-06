import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Chat from "src/screens/chat/Chat";
import ConversationList from "src/screens/chat/Index";
import { primaryColor } from "src/util/constants";
import { useAppSelector } from "src/util/hooks";

const Stack = createNativeStackNavigator<ChatStackParamList>();

function ChatStackRouter() {
  const { currentConversation } = useAppSelector((state) => state.conversation);
  const { id } = useAppSelector((state) => state.auth.userInfo);

  const chatPartnerId = currentConversation.participants.find(
    (item) => item !== id
  );

  return (
    <Stack.Navigator
      initialRouteName={"ConversationList"}
      screenOptions={{
        animation: "ios",
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: primaryColor },
        headerTitleStyle: { color: "white" },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="ConversationList"
        component={ConversationList}
        options={{
          title: "Chat",
        }}
      />

      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{
          title: `${chatPartnerId}`,
        }}
      />
    </Stack.Navigator>
  );
}

export default ChatStackRouter;
