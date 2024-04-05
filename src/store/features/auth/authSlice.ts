import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthState, UserT, UserType } from "../../../utils/interfacesAndTypes";
import axios from "axios";
import { API_URL } from "../../../utils/consts";
import { AppThunk } from "../../store";
import $axios from "../../../utils/axios";

const initialState: AuthState = {
    isAuthenticated: false,
    userActive: {
        uid: "",
        token: ""
    },
    user: null
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      setAuthenticated: (state, action: PayloadAction<boolean>) => {
        state.isAuthenticated = action.payload;
      },
      setActivate: (state, action: PayloadAction<{ uid: string; token: string }>) => {
        state.userActive = action.payload;
      },
      setUser: (state, action: PayloadAction<{ email: string; name: string }>) => {
            state.user = {
                email: action.payload.email,
                name: action.payload.name,
            };
        },
    },
});  


export const signUp = (obj: any): AppThunk => async (dispatch) => {
    try {
        const response = await axios.post(`${API_URL}/users/`, obj);
        dispatch(authSlice.actions.setAuthenticated(response.data));
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const activateUser = (obj: UserType): AppThunk => async (dispatch) => {
    try {
        console.log(obj)
        const response = await axios.post(`${API_URL}/users/activation/`, obj);
        dispatch(authSlice.actions.setActivate(response.data));
        console.log(response.data, obj);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export const signIn = (obj: UserT): AppThunk => async (dispatch) => {
    try {
        const { data: tokens } = await axios.post(`${API_URL}/login/jwt/create/`, obj);
        localStorage.setItem("tokens", JSON.stringify({ access: tokens.access, refresh: tokens.refresh }));
        
        const response: any = await $axios.get(`${API_URL}/users/me/`);
        dispatch(authSlice.actions.setUser(response.data));
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        return response.data;
        
    } catch (error: any) {
        console.error("Error during fetch:", error);
        console.log("Error response:", error.response);
        throw error;
    }
}

export const resendAuth = (obj: any): AppThunk => async () => {
    try {
        const respones = await axios.post(`${API_URL}/users/reset_password/`, obj);
        console.log(respones);
    } catch (error) {
        console.log(error);
    }
}

export const newPasswordConfirm = (obj: any): AppThunk => async () => {
    try {
        const response = await axios.post(`${API_URL}/users/reset_password_confirm/`, obj);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

export const { setAuthenticated, setUser } = authSlice.actions;

export default authSlice.reducer