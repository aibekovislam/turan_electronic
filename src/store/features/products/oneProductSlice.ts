import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../../store";
import axios from "axios";
import { API_URL } from "../../../utils/consts";
import { ProductI } from "../../../utils/interfacesAndTypes";

const initialState: ProductI = {
    product: null,
    pickedColor: null
}

const productOneSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
      setProduct: (state, action: PayloadAction<ProductI>) => {
        state.product = action.payload.product;
      },
      setColorPicked: (state, action: PayloadAction<string | null>) => {
        state.pickedColor = action.payload;
      }      
    }
});
  
export const fetchOneProducts = (id: number): AppThunk => async (dispatch) => {
    try {
        const response = await axios.get(`${API_URL}/products/${id}/`);
        const data: ProductI = { product: response.data };
        dispatch(productOneSlice.actions.setProduct(data))
    } catch (error) {
        console.log(error);
        console.log(id)
    }
}

export const colorPickToAddToCart = (color: string | null): AppThunk => (dispatch) => {
    localStorage.setItem("colorPicked", JSON.stringify(color));
    dispatch(productOneSlice.actions.setColorPicked(color));
}

export const { setProduct, setColorPicked } = productOneSlice.actions;
export default productOneSlice.reducer;