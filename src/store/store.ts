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
import userReducer from "./features/auth/authSlice";
import favoritesReducer from "./features/favorite_and_cart/favoriteSlice";
import cartReducer from "./features/favorite_and_cart/cartSlice";
import orderReducer from "./features/order/orderSlice";
import newsReducer from "./features/news/newsSlice";
import newsOneSliceReducer from "./features/news/oneNewsSlice";
import dropdownReducer from './features/dropdown/dropdownSlice'
import footerReducer from "./features/footer/footerSlice";



export const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productsReducer,
        productRec: productRecReducer,
        brands: brandReducer,
        footers: footerReducer,
        carousel: carouselReducer,
        accessories: accessoriesReducer,
        oneProduct: productOneSliceReducer,
        oneBrand: oneBrandSliceReducer,
        reviews: reviewsSliceReducer,
        user: userReducer,
        favorites: favoritesReducer,
        carts: cartReducer,
        orders: orderReducer,
        news: newsReducer,
        oneNews: newsOneSliceReducer,
        dropdown: dropdownReducer
    }
})

export type RootStates = ReturnType<typeof store.getState>;
export type AppThunk <ReturnType = void> = ThunkAction<
  ReturnType,
  RootStates,
  unknown,
  Action<string>
>;