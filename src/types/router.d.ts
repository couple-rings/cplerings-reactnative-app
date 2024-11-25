import { NavigatorScreenParams } from "@react-navigation/native";

export {};

declare global {
  type RootTabParamList = {
    HomeStack: NavigatorScreenParams<HomeStackParamList>;

    ChatStack: NavigatorScreenParams<ChatStackParamList>;

    SettingStack: NavigatorScreenParams<SettingStackParamList>;

    Map: undefined;
  };

  type RootStackParamList = {
    Intro: undefined;

    Login: undefined;

    ForgetPassword: undefined;

    ResetPassword: { email: string };

    RootTab: NavigatorScreenParams<RootTabParamList>;
  };

  type HomeStackParamList = {
    OrderList: undefined;

    OrderDetail: { id: number };

    Scan: { customerId: number };

    UpdateStatus: { orderId: number };
  };

  type ChatStackParamList = {
    ConversationList: undefined;

    Chat: { conversationId: string };
  };

  type SettingStackParamList = {
    Setting: undefined;

    Status: undefined;

    Profile: undefined;

    Security: undefined;
  };
}
