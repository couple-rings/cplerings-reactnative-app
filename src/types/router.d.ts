import { NavigatorScreenParams } from "@react-navigation/native";

export {};

declare global {
  type RootTabParamList = {
    HomeStack: NavigatorScreenParams<HomeStackParamList>;
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
}
