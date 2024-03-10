import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../../store";
import axios from "axios";
import { API_URL } from "../../../utils/consts";
import { ProductsI } from "../../../utils/interfacesAndTypes";

const initialState: ProductsI = {
    products: [],
    colors: [],
    filters: {
      brand: null,
      memory: null,
    },
    filteredProducts: [],
};  

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<ProductsI>) => {
            state.products = action.payload.products;
        },
        setColors: (state, action: PayloadAction<{ colors: any }>) => {
            state.colors = action.payload.colors || [];
        },
        filterProductsByBrand: (state, action: PayloadAction<string | null>) => {
            const nameForFilter = action.payload;
            console.log(state.products);
        
            const newState = { ...state };
        
            newState.filteredProducts = (nameForFilter === null || nameForFilter === "all") ? newState.products : [];
        
            if (nameForFilter && nameForFilter !== "all") {
                newState.filteredProducts = newState.products.filter((item) => item.brand_category_title === nameForFilter);
            }
        
            Object.assign(state, newState);
        },                              
    }
});

export const fetchProducts = (): AppThunk => async (dispatch) => {
    try {
        const response = await axios.get(`${API_URL}/products/`);
        const data: ProductsI = { products: response.data.results };
        const colors = { colors: response.data.colors }

        dispatch(productSlice.actions.setProducts(data));
        dispatch(productSlice.actions.setColors(colors));
    } catch (error) {
        console.log(error);
    }
}

export const { setProducts, setColors, filterProductsByBrand } = productSlice.actions;
export default productSlice.reducer;