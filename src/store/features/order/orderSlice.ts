import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../../store";
import { API_URL } from "../../../utils/consts";
import { OrderI, OrderType } from "../../../utils/interfacesAndTypes";
import $axios from "../../../utils/axios";
import { fetchCarts } from "../favorite_and_cart/cartSlice";

const initialState: OrderI = {
    regions: [],
    cities: [],
    order: []
};  

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setRegions: (state, action: PayloadAction<any[]>) => {
            state.regions = action.payload;
        },
        setCities: (state, action: PayloadAction<any>) => {
            state.cities = action.payload
        },
    }
});

export const fetchRegions = (): AppThunk => async (dispatch) => {
    try {
        const response = await $axios.get(`${API_URL}/regions/`);
        dispatch(setRegions(response.data));
    } catch (error) {
        console.log(error);
    }
};

export const fetchCities = (id: number): AppThunk => async (dispatch) => {
    try {
        const response = await $axios.get(`${API_URL}/regions/${id}`);
        console.log(response)
        dispatch(orderSlice.actions.setCities(response.data));
    } catch (error) {
        console.log(error);
    }
}

export const addOrder = (obj: OrderType): AppThunk => async (dispatch) => {
    try {
        const response = await $axios.post(`${API_URL}/orders/`, obj);
        console.log(response);
        dispatch(fetchCarts())
    } catch (error) {
        console.log(error);
    }
}

export const { setRegions } = orderSlice.actions;
export default orderSlice.reducer;