import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BrandsI } from "../../../utils/interfacesAndTypes";
import { AppThunk } from "../../store";
import axios from "axios";
import { API_URL } from "../../../utils/consts";

const initialState: BrandsI = {
    brands: []
}

const brandsSlice = createSlice({
    name: "brands",
    initialState,
    reducers: {
        setBrands: (state, action: PayloadAction<BrandsI>) => {
            state.brands = action.payload.brands
        },
    }
});

export const fetchBrands = (): AppThunk => async (dispatch) => {
    try {
        const response = await axios.get(`${API_URL}/brands/`)
        const data: BrandsI = {brands: response.data.results}
        dispatch(brandsSlice.actions.setBrands(data))
    } catch (error) {
        console.log(error);
    }
}

export const {setBrands} = brandsSlice.actions
export default brandsSlice.reducer