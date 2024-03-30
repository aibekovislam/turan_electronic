import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FooterI } from "../../../utils/interfacesAndTypes";
import { AppThunk } from "../../store";
import axios from "axios";
import { API_URL } from "../../../utils/consts";

const initialState: FooterI = {
    footers: null
}

const footersSlice = createSlice({
    name: "footers",
    initialState,
    reducers: {
        setFooters: (state, action: PayloadAction<FooterI>) => {
            state.footers = action.payload.footers
        },
    }
});

export const fetchFooters = (): AppThunk => async (dispatch) => {
    try {
        const response = await axios.get(`${API_URL}/site/footers/`);
        console.log(response)
        const data: FooterI = {footers: response.data}
        dispatch(footersSlice.actions.setFooters(data))
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

export const {setFooters} = footersSlice.actions
export default footersSlice.reducer