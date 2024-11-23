import {
  CustomOrderStatus,
  DesignCharacteristic,
  GoldColor,
  RingStatus,
  TransportOrderStatus,
  UserRole,
  VersionOwner,
} from "src/util/enums";

export {};

declare global {
  interface IBranch {
    id: number;
    address: string;
    storeName: string;
    phone: string;
    coverImage?: {
      id: number;
      url: string;
    };
  }

  interface IUser {
    id: number;

    email: string;

    username: string;

    phone: string | null;

    avatar: string | null;

    role: UserRole;

    branch: IBranch | null;
  }

  interface IFile {
    _id: string;

    url: string;

    key: string;

    size?: number;

    originalName: string;
  }

  interface IMessage {
    _id?: string;

    sender: number;

    content: string;

    conversationId: string;

    sentAt: string;

    imageId?: IFile;

    attachmentId?: IFile;

    read?: boolean;
  }

  interface IConversation {
    _id: string;

    participants: number[];

    latestMessage?: IMessage;

    notifiedUsers?: number[];
  }

  interface IMetalSpec {
    id: number;

    name: string;

    pricePerUnit: number;

    color: GoldColor;
  }

  interface IDiamondSpec {
    id: number;

    name: string;

    weight: number;

    color: string;

    clarity: string;

    shape: string;

    price: number;
  }

  interface ICollection {
    id: number;

    name: string;

    description: string;
  }

  interface IDesign {
    id: number;

    metalWeight: number;

    name: string;

    description: string;

    blueprint: {
      url: string;
    };

    characteristic: DesignCharacteristic;

    size: number;

    sideDiamondsCount: number;

    designMetalSpecifications: {
      id: number;

      metalSpecification: IMetalSpec;

      image: {
        url: string;
      };
    }[];

    designDiamondSpecifications: {
      id: number;

      diamondSpecification: IDiamondSpec;
    }[];

    designCollection: ICollection;
  }

  interface IDesignVersion {
    id: number;
    customer: IUser;
    design: IDesign;
    image: {
      url: string;
    };
    designFile: {
      id: number;
      url: string;
    };
    versionNumber: 0;
    isAccepted: boolean;
    isOld: boolean;
    owner?: VersionOwner;
  }

  interface ICustomDesign {
    id: number;
    designVersion: IDesignVersion;
    spouse: ISpouse;
    account: IUser;
    metalWeight: number;
    blueprint: {
      id: number;
      url: string;
    };
    diamondSpecifications: IDiamondSpec[];
    metalSpecifications: IMetalSpec[];
    sideDiamondsCount: number;
  }

  interface ISpouse {
    id: number;
    customerId?: number;
    fullName: string;
  }

  interface IRing {
    id: number;
    purchaseDate: string;
    status: RingStatus;
    maintenanceExpiredDate: string;
    maintenanceDocument?: {
      id: number;
      url: string;
      createdAt: string;
    };
    spouse: ISpouse;
    customDesign: ICustomDesign;
    fingerSize: number;
    engraving?: string;
    metalSpecification: IMetalSpec;
    diamonds: IDiamond[];
    branch: IBranch;
  }

  interface IDiamond {
    id: number;
    giaReportNumber: string;
    giaDocument: {
      id: number;
      url: string;
    };
    diamondSpecification: IDiamondSpec;
    branch: IBranch;
    createdAt: string;
  }

  interface IContract {
    id: number;
    signature?: {
      id: number;
      url: string;
      createdAt: string;
    };
    signedDate?: string;
    document?: {
      id: number;
      url: string;
    };
    createdAt: string;
  }

  interface ICustomOrder {
    id: number;
    orderNo: string;
    firstRing: IRing;
    secondRing: IRing;
    customer: IUser;
    jeweler?: IUser;
    contract: IContract;
    totalPrice: {
      amount: number;
    };
    status: CustomOrderStatus;
    createdAt: string;
  }

  interface ITransportOrder {
    id: number;
    orderNo: string;
    status: TransportOrderStatus;
    receiverName: string;
    receiverPhone: string;
    deliveryAddress: string;
    customOrder?: ICustomOrder;
    transporter: IUser;
    transportationNotes: {
      id: number;
      date: string;
      note: string;
    }[];
  }
}
