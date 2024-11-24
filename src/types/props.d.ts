import { StyleProp, TouchableOpacityProps, ViewStyle } from "react-native";
import { FailReason, ProductType } from "src/util/enums";

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
    data: ITransportOrder;
  }

  interface IProductCardProps {
    productType: ProductType;
    data: IRing;
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
    reason?: FailReason;
    note?: string;
  }

  interface IConversationProps {
    conversation: IConversation;
  }

  interface IPartnerMessageProps {
    timestamp: string;

    children: React.ReactElement;

    isImage?: boolean;
  }

  interface IOwnMessageProps extends IPartnerMessageProps {}

  interface ITextMessageProps {
    content: string;

    scrollToEnd?: () => void;
  }

  export interface IImageMessageProps {
    url: string | ImageSourcePropType;

    scrollToEnd?: () => void;
  }

  interface IAttachmentMessageProps {
    url: string;

    name: string;

    size: number | undefined;

    scrollToEnd?: () => void;
  }

  interface IChangePWProps {
    setPWVerified: (v: boolean) => void;
  }

  interface IStatusCardProps {
    id: number;
    date: string;
    note: string;
    pressStatus?: (v: string) => void;
  }
}
