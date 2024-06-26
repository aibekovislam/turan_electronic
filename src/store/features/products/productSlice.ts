import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../../store";
import axios from "axios";
import { API_URL } from "../../../utils/consts";
import { ProductsI } from "../../../utils/interfacesAndTypes";

const initialState: ProductsI = {
    products: [],
    colors: [],
    filteredProducts: [],
    filterByBrand: [],
    filterByBrandCategory: [],
};  

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<ProductsI>) => {
            state.products = action.payload.products;
            state.filteredProducts = [];
        },
        setColors: (state, action: PayloadAction<{ colors: any }>) => {
            state.colors = action.payload.colors || [];
        },
        setFilterProducts: (state, action: PayloadAction<ProductsI>) => {
            state.filteredProducts = action.payload.filteredProducts;
        },
        setFilterByBrand: (state, action: PayloadAction<ProductsI>) => {
            state.filterByBrand = action.payload.filterByBrand;
        },
        setFilterByBrandCategory: (state, action: PayloadAction<ProductsI>) => {
            state.filterByBrandCategory = action.payload.filterByBrandCategory;
        },
    }
});

export const fetchProducts = (filters: any): AppThunk => async (dispatch) => {
    try {
        const queryParams = {
            limit: filters.limit || 100,
            offset: filters.offset || 0,
            min_price: filters.min_price || undefined,
            max_price: filters.max_price || undefined,
            brand: filters.brand || [],
            color: filters.color || [],
            memory: filters.memory || [],
        };

        const response = await axios.get(`${API_URL}/products/`, { params: queryParams });

        const data: ProductsI = { products: response.data.results };
        const colors = { colors: response.data.colors };
        dispatch(productSlice.actions.setProducts(data));
        dispatch(productSlice.actions.setColors(colors));
    } catch (error) {
        console.log(error);
    }
}

export const fetchFilterProducts = (filters: any): AppThunk => async (dispatch) => {
    try {
        const queryParams = {
            limit: filters.limit || 100,
            offset: filters.offset || 0,
            min_price: filters.min_price || undefined,
            max_price: filters.max_price || undefined,
            brand: filters.brand || [],
            colors: filters.color || undefined,
            brand_category: filters.brand_category || undefined,
            memory: filters.memory || [],
            product_name: filters.product_name || undefined,
        };             

        const response = await axios.get(`${API_URL}/products/`, { params: queryParams });

        console.log(response);

        const data = { filteredProducts: response.data.results };

        dispatch(productSlice.actions.setFilterProducts(data));

        if (data.filteredProducts?.length === 0) {
            return 'Такого нету';
        }
    } catch (error) {
        console.log(error);
    }
};

export const getProductsByOneBrand = (filters: any): AppThunk => async (dispatch) => {
    try {
        const queryParams = {
            limit: 100,
            brand: filters.brand || [],
        };

        const response = await axios.get(`${API_URL}/products/`, { params: queryParams });
        const data: ProductsI = { filterByBrand: response.data.results };
        dispatch(productSlice.actions.setFilterByBrand(data));
    } catch (error) {
        console.log(error);
    }
}

export const getProductsByBrandCategory = (filters: any): AppThunk => async (dispatch) => {
    try {
        const queryParams = {
            limit: 100,
            brand: filters.brand || [],
            brand_category: filters.brand_category || undefined
        };

        const response = await axios.get(`${API_URL}/products/`, { params: queryParams });
        const data: ProductsI = { filterByBrandCategory: response.data.results };
        dispatch(productSlice.actions.setFilterByBrandCategory(data));
    } catch (error) {
        console.log(error);
    }
}

export const searchProducts = (search_filters: any): AppThunk => async (dispatch) => {
    try {
        const response = await axios.get(`${API_URL}/products/`, {params: {
            search: search_filters
        }})
        const data: ProductsI = { products: response.data.results };
        dispatch(productSlice.actions.setProducts(data));
    } catch (error) {
        console.log(error);
    }
}

export const { setProducts, setColors, setFilterProducts } = productSlice.actions;
export default productSlice.reducer;