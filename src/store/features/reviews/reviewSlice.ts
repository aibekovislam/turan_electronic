import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../../store";
import axios from "axios";
import { API_URL } from "../../../utils/consts";
import { ReviewI } from "../../../utils/interfacesAndTypes";

const initialState: ReviewI = {
    reviews: [],
};  

const reviewSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setReviews: (state, action: PayloadAction<ReviewI>) => {
            state.reviews = action.payload.reviews;
        },                          
    }
});

export const fetchReviews = (): AppThunk => async (dispatch) => {
    try {
        const response = await axios.get(`${API_URL}/reviews/`);
        const data: ReviewI = { reviews: response.data.results };
        dispatch(reviewSlice.actions.setReviews(data));
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

export const { setReviews } = reviewSlice.actions;
export default reviewSlice.reducer;