import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../../store";
import axios from "axios";
import { API_URL } from "../../../utils/consts";
import { ReviewI } from "../../../utils/interfacesAndTypes";
import $axios from "../../../utils/axios";

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
    } catch (error) {
        console.log(error);
    }
}

export const addReview = (obj: any): AppThunk => async (dispatch) => {
    try {
        const response = await $axios.post(`${API_URL}/reviews/`, obj);
        console.log(obj)
        await dispatch(fetchReviews());
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const { setReviews } = reviewSlice.actions;
export default reviewSlice.reducer;