import { NavigatorScreenParams } from "@react-navigation/native";

export {};

declare global {
  type RootTabParamList = {
    HomeStack: NavigatorScreenParams<HomeStackParamList>;

    ChatStack: NavigatorScreenParams<ChatStackParamList>;
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
  };

  type ChatStackParamList = {
    ConversationList: undefined;

    Chat: undefined;
  };
}
