import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../../store";
import axios from "axios";
import { API_URL } from "../../../utils/consts";
import { AccessoriesI } from "../../../utils/interfacesAndTypes";

const initialState: AccessoriesI = {
    accessories: [],
}

const accessoriesSlice = createSlice({
    name: "accessories",
    initialState,
    reducers: {
        setAccessories: (state, action: PayloadAction<AccessoriesI>) => {
            state.accessories = action.payload.accessories;
        },      
    }
});

export const fetchAccessories = (): AppThunk => async (dispatch) => {
    try {
        const response = await axios.get(`${API_URL}/products/get_accessories/`);
        const data: AccessoriesI = { accessories: response.data["Аксессуары"] };
        console.log(data)
        dispatch(accessoriesSlice.actions.setAccessories(data))
    } catch (error) {
        console.log(error);
    }
}

export const { setAccessories } = accessoriesSlice.actions;
export default accessoriesSlice.reducer;