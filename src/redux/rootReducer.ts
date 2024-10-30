import { combineReducers } from "redux";
import authReducer from "src/redux/slices/auth.slice";

export const rootReducer = combineReducers({
  auth: authReducer,
});
