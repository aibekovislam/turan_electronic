import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../../utils/interfacesAndTypes";
import axios from "axios";
import { API_URL } from "../../../utils/consts";
import { AppThunk } from "../../store";

const initialState: AuthState = {
    isAuthenticated: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthenticated: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload
        },
    }
})

// authSlice.ts
export const signUp = (obj: any): AppThunk => async (dispatch) => {
    try {
        const response = await axios.post(`${API_URL}/users/`, obj);
        dispatch(authSlice.actions.setAuthenticated(response.data));
        console.log(response.data);
        return response.data; // Возвращаем данные, чтобы получить их в компоненте
    } catch (error) {
        console.log(error);
        throw error; // Мы можем выбросить ошибку, чтобы обработать ее в компоненте, если необходимо
    }
}

export const { setAuthenticated } = authSlice.actions;

export default authSlice.reducer