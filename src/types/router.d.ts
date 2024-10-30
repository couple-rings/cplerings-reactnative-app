import { NavigatorScreenParams } from "@react-navigation/native";

export {};

declare global {
  type RootTabParamList = {
    HomeStack: NavigatorScreenParams<HomeStackParamList>;
  };

  type RootStackParamList = {
    Intro: undefined;

    RootTab: NavigatorScreenParams<RootTabParamList>;
  };

  type HomeStackParamList = {
    OrderList: undefined;
  };
}
