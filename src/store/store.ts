import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import productsReducer from "./features/products/productSlice";
import productRecReducer from "./features/products/productRecommenededSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productsReducer,
        productRec: productRecReducer
    }
})

export type RootStates = ReturnType<typeof store.getState>;
export type AppThunk <ReturnType = void> = ThunkAction<
  ReturnType,
  RootStates,
  unknown,
  Action<string>
>;