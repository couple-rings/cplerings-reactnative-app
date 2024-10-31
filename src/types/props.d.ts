import { StyleProp, TouchableOpacityProps, ViewStyle } from "react-native";

export {};

declare global {
  interface IHeaderProps {
    title: string;
    subtitle: string;
  }
  interface IButtonProps {
    title: string;
    style?: StyleProp<ViewStyle>;
    options?: TouchableOpacityProps;
    variant: ButtonVariant;
    loading?: boolean;
  }
}
