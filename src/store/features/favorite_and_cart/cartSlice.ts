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
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
}

export const addToCart = (product_id: number | undefined): AppThunk => async (dispatch) => {
    try {
        const obj = {
            product: product_id
        }
        const response = await $axios.post(`${API_URL}/carts/`, obj);
        dispatch(fetchCarts());
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
}

export const { setCarts } = cartSlice.actions;

export default cartSlice.reducer;