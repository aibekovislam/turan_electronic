import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../../store";
import $axios from "../../../utils/axios";
import { API_URL } from "../../../utils/consts";

const initialState = {
    orderHistory: []
}

export const orderHistorySlice = createSlice({
    name: "orderHistory",
    initialState,
    reducers: {
        setOrderHistory: (state, action: PayloadAction<any>) => {
            state.orderHistory = action.payload.orderHistory
        }
    }
})


export const fetchOrderHistory = (): AppThunk => async (dispatch) => {
    try {
        const response = await $axios.get(`${API_URL}/orders/get_history/`);
        dispatch(orderHistorySlice.actions.setOrderHistory({ orderHistory: response.data }))
    } catch (error) {
        console.log(error);
    }
}

export const { setOrderHistory } = orderHistorySlice.actions;
export default orderHistorySlice.reducer;