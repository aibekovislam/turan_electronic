import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../../store";
import axios from "axios";
import { API_URL } from "../../../utils/consts";

const initialState: any = {
    news: null,
}

const newsOneSlice = createSlice({
    name: "oneNews",
    initialState,
    reducers: {
      setNews: (state, action: PayloadAction<any>) => {
        state.news = action.payload.news;
      },
    }
});
  
export const fetchOneNews = (id: number): AppThunk => async (dispatch) => {
    try {
        const response = await axios.get(`${API_URL}/news/${id}/`);
        const data: any = { news: response.data };
        dispatch(newsOneSlice.actions.setNews(data))
    } catch (error) {
        console.log(error);
    }
}


export const { setNews } = newsOneSlice.actions;
export default newsOneSlice.reducer;