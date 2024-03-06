import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../../store";
import axios from "axios";
import { API_URL } from "../../../utils/consts";
import { CarouselI } from "../../../utils/interfacesAndTypes";

const initialState: CarouselI = {
    carousel: []
}

const carouselSlice = createSlice({
    name: "carousel",
    initialState,
    reducers: {
        setCarousel: (state, action: PayloadAction<CarouselI>) => {
            state.carousel = action.payload.carousel;
        },      
    }
});

export const fetchCarousel = (): AppThunk => async (dispatch) => {
    try {
        const response = await axios.get(`${API_URL}/carousel`);
        const data: CarouselI = { carousel: response.data.results };
        // console.log(data)
        dispatch(carouselSlice.actions.setCarousel(data))
    } catch (error) {
        console.log(error);
    }
}

export const { setCarousel } = carouselSlice.actions;
export default carouselSlice.reducer;