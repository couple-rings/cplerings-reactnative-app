import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Chat from "src/screens/chat/Chat";
import ConversationList from "src/screens/chat/Index";
import { primaryColor } from "src/util/constants";
import { useAppSelector } from "src/util/hooks";

const Stack = createNativeStackNavigator<ChatStackParamList>();

function ChatStackRouter() {
  const { currentConversation } = useAppSelector((state) => state.conversation);

  const name = currentConversation.partner
    ? currentConversation.partner.username
    : "Anonymous";

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
          title: `${name}`,
        }}
      />
    </Stack.Navigator>
  );
}

export default ChatStackRouter;
