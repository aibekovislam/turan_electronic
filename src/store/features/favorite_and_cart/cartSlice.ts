import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartState, CartType } from "../../../utils/interfacesAndTypes";
import { AppThunk } from "../../store";
import $axios from "../../../utils/axios";
import { API_URL } from "../../../utils/consts";

const initialState: CartState = {
    carts: [],
}

export const cartSlice = createSlice({
    name: "carts",
    initialState,
    reducers: {
      setCarts: (state, action: PayloadAction<CartType[]>) => {
        state.carts = action.payload;
      }
    },
});

export const fetchCarts = (): AppThunk => async (dispatch) => {
    try {
        const response = await $axios.get(`${API_URL}/carts/`);
        dispatch(cartSlice.actions.setCarts(response.data.results));
    } catch (error) {
        console.log(error);
    }
}

export const deleteCart = (id: number): AppThunk => async (dispatch, getState) => {
    try {
        const response = await $axios.delete(`${API_URL}/carts/${id}/`);
        if (response.status === 204) {
            const updatedCarts = getState().carts.carts.filter(cart => cart.id !== id);
            dispatch(cartSlice.actions.setCarts(updatedCarts));
        } else {
            console.log("Ошибка при удалении товара");
        }
    } catch (error) {
        console.log(error);
    }
}

export const addToCart = (product_id: number | undefined, color: number | undefined, count: number, memory: number | undefined, price: any | undefined): AppThunk => async (dispatch) => {
    try {
        const productPrice = price; 
        const obj = {
            product: product_id,
            count: count,
            color: color,
            memory: memory,
            productPrice, price
        }
        const response = await $axios.post(`${API_URL}/carts/`, obj);
        console.log(response, obj)
        dispatch(fetchCarts());
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

export const changeCountCartProduct = (count: number, product_id: number): AppThunk => async (dispatch) => {
    try {
        const response = await $axios.patch(`${API_URL}/carts/${product_id}/`, { count: count });
        dispatch(fetchCarts());
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

export const clearCart = (): AppThunk => async (dispatch) => {
    try {
        const response = await $axios.post(`${API_URL}/carts/clear/`);
        console.log(response);
        dispatch(fetchCarts());
        localStorage.removeItem("addedProducts");
    } catch (error) {
        console.log(error);
    }
}

export const { setCarts } = cartSlice.actions;

export default cartSlice.reducer;