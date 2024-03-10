import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../../store";
import axios from "axios";
import { API_URL } from "../../../utils/consts";
import { ProductI } from "../../../utils/interfacesAndTypes";

const initialState: ProductI = {
    product: null
}

const productOneSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
      setProduct: (state, action: PayloadAction<ProductI>) => {
        state.product = action.payload.product;
      },      
    }
});
  
export const fetchOneProducts = (id: number): AppThunk => async (dispatch) => {
    try {
        const response = await axios.get(`${API_URL}/products/${id}`);
        const data: ProductI = { product: response.data };
        // console.log(data)
        dispatch(productOneSlice.actions.setProduct(data))
    } catch (error) {
        console.log(error);
    }
}

export const { setProduct } = productOneSlice.actions;
export default productOneSlice.reducer;