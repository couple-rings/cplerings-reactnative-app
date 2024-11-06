import { io } from "socket.io-client";

const URL = process.env.EXPO_PUBLIC_NESTJS_SERVER_URL;

export const socket = io(URL as string);
