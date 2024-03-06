import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import productsReducer from "./features/products/productSlice";
import brandReducer from "./features/brands/brandsSlice";
import carouselReducer from "./features/carousel/carouselSlice";



export const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productsReducer,
        brands: brandReducer,
        carousel: carouselReducer

    }
})

export type RootStates = ReturnType<typeof store.getState>;
export type AppThunk <ReturnType = void> = ThunkAction<
  ReturnType,
  RootStates,
  unknown,
  Action<string>
>;