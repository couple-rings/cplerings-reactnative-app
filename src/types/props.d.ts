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

  interface ICurlButtonProps extends Omit<IButtonProps, "loading"> {}

  interface IOrderCardProps {
    status: OrderStatus;
    name: string;
    phone: string;
    address: string;
    quantity: number;
  }

  interface IProductCardProps {
    name: string;
    image: string | ImageSourcePropType;
    size: number;
    engraving: string;
    metal: string;
    diamond: string;
  }

  interface ICustomerCardProps {
    name: string;
    phone: string;
    address: string;
  }

  interface IConfirmModalProps {
    visible: boolean;
    setVisible: (v: boolean) => void;
    title: string;
    message: string;
  }
}
