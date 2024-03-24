import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { NewsI } from "../../../utils/interfacesAndTypes";
import { AppThunk } from "../../store";
import axios from "axios";
import { API_URL } from "../../../utils/consts";

const initialState: NewsI = {
    news: []
}

const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {
        setNews: (state, action: PayloadAction<NewsI>) => {
            state.news = action.payload.news
        },
    }
});

export const fetchNews = (): AppThunk => async (dispatch) => {
    try {
        const response = await axios.get(`${API_URL}/news/`)
        const data: NewsI = {news: response.data.results}
        dispatch(newsSlice.actions.setNews(data))
    } catch (error) {
        console.log(error);
    }
}

export const {setNews} = newsSlice.actions
export default newsSlice.reducer