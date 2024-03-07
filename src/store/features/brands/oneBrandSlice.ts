import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../../store";
import axios from "axios";
import { API_URL } from "../../../utils/consts";
import { BrandI } from "../../../utils/interfacesAndTypes";

const initialState: BrandI = {
    brand: null
}

const brandOneSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
      setBrand: (state, action: PayloadAction<BrandI>) => {
        state.brand = action.payload.brand;
      },      
    }
});
  
export const fetchOneBrand = (id: number): AppThunk => async (dispatch) => {
    try {
        const response = await axios.get(`${API_URL}/brands/${id}`);
        const data: BrandI = { brand: response.data };
        console.log(data)
        dispatch(brandOneSlice.actions.setBrand(data))
    } catch (error) {
        console.log(error);
    }
}

export const { setBrand } = brandOneSlice.actions;
export default brandOneSlice.reducer;