import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";

const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  // 다른 리듀서들도 추가 가능
});

const store = configureStore({
  reducer: rootReducer,
  // 미들웨어 등 다른 설정들도 추가 가능
});

export default store;
