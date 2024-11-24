import { combineReducers } from "redux";
import authReducer from "src/redux/slices/auth.slice";
import conversationReducer from "src/redux/slices/conversation.slice";
import messageReducer from "src/redux/slices/message.slice";
import orderReducer from "src/redux/slices/order.slice";

export const rootReducer = combineReducers({
  auth: authReducer,
  conversation: conversationReducer,
  message: messageReducer,
  order: orderReducer,
});
