import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../../store";
import axios from "axios";
import { API_URL } from "../../../utils/consts";
import { ProductsI } from "../../../utils/interfacesAndTypes";

const initialState: ProductsI = {
    products: [],
    colors: []
}

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<ProductsI>) => {
            state.products = action.payload.products;
        },
        setColors: (state, action: PayloadAction<{ colors: any }>) => {
            state.colors = action.payload.colors || [];
        }
    }
});

export const fetchProducts = (): AppThunk => async (dispatch) => {
    try {
        const response = await axios.get(`${API_URL}/products/`);
        const data: ProductsI = { products: response.data.results };
        const colors = { colors: response.data.colors }
        // console.log(data)
        dispatch(productSlice.actions.setProducts(data));
        dispatch(productSlice.actions.setColors(colors));
    } catch (error) {
        console.log(error);
    }
}

export const { setProducts, setColors } = productSlice.actions;
export default productSlice.reducer;