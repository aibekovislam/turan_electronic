import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import productsReducer from "./features/products/productSlice";
import productRecReducer from "./features/products/productRecommenededSlice";
import brandReducer from "./features/brands/brandsSlice";
import carouselReducer from "./features/carousel/carouselSlice";
import accessoriesReducer from "./features/accessories/accessoriesSlice"
import productOneSliceReducer from "./features/products/oneProductSlice";
import oneBrandSliceReducer from "./features/brands/oneBrandSlice";
import reviewsSliceReducer from "./features/reviews/reviewSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productsReducer,
        productRec: productRecReducer,
        brands: brandReducer,
        carousel: carouselReducer,
        accessories: accessoriesReducer,
        oneProduct: productOneSliceReducer,
        oneBrand: oneBrandSliceReducer,
        reviews: reviewsSliceReducer
    }
})

export type RootStates = ReturnType<typeof store.getState>;
export type AppThunk <ReturnType = void> = ThunkAction<
  ReturnType,
  RootStates,
  unknown,
  Action<string>
>;