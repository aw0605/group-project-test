import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "../slice/cartSlice";

export const rootReducer = combineReducers({
  cart: cartReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
