import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../../store";
import axios from "axios";
import { API_URL } from "../../../utils/consts";
import { RecProductsI } from "../../../utils/interfacesAndTypes";

const initialState: RecProductsI = {
    rec_products: [],
}

const productRecSlice = createSlice({
    name: "rec_products",
    initialState,
    reducers: {
        setRecProducts: (state, action: PayloadAction<RecProductsI>) => {
            state.rec_products = action.payload.rec_products;
        },      
    }
});

export const fetchRecProducts = (): AppThunk => async (dispatch) => {
    try {
        const response = await axios.get(`${API_URL}/products/recommended`);
        const data: RecProductsI = { rec_products: response.data.products };
        dispatch(productRecSlice.actions.setRecProducts(data))
    } catch (error) {
        console.log(error);
    }
}

export const { setRecProducts } = productRecSlice.actions;
export default productRecSlice.reducer;