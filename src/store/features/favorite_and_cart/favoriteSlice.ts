import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FavoriteState, favoriteType } from "../../../utils/interfacesAndTypes";
import { AppThunk } from "../../store";
import $axios from "../../../utils/axios";
import { API_URL } from "../../../utils/consts";

const initialState: FavoriteState = {
    favorites: [],
}

export const favoriteSlice = createSlice({
    name: "favorite",
    initialState,
    reducers: {
      setFavorites: (state, action: PayloadAction<favoriteType[]>) => {
        state.favorites = action.payload;
      }
    },
});

export const fetchFavorites = (): AppThunk => async (dispatch) => {
    try {
        const response = await $axios.get(`${API_URL}/users/favorites/`);
        dispatch(favoriteSlice.actions.setFavorites(response.data));
    } catch (error) {
        return error;
    }
}

export const addFavorites = (products_id: number): AppThunk => async (dispatch) => {
    try {
        const response = await $axios.post(`${API_URL}/products/${products_id}/favorite/`);
        dispatch(fetchFavorites());
        console.log(response.data)
        return response.data
    } catch (error) {
        return error;
    }
}

export const clearFavorites = (): AppThunk => async (dispatch) => {
    try {
        const response = await $axios.post(`${API_URL}/products/clear_favorites/`);
        dispatch(fetchFavorites());
        console.log(response);
    } catch (error) {
        return error;
    }
}

export const { setFavorites } = favoriteSlice.actions;

export default favoriteSlice.reducer;