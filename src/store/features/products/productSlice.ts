import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../../store";
import axios from "axios";
import { API_URL } from "../../../utils/consts";
import { ProductsI } from "../../../utils/interfacesAndTypes";

const initialState: ProductsI = {
    products: [],
}

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<ProductsI>) => {
            state.products = action.payload.products;
        },      
    }
});

export const fetchProducts = (): AppThunk => async (dispatch) => {
    try {
        const response = await axios.get(`${API_URL}/products/`);
        const data: ProductsI = { products: response.data.results };
        // console.log(data)
        dispatch(productSlice.actions.setProducts(data))
    } catch (error) {
        console.log(error);
    }
}

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;