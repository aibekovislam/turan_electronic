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
        const response = await axios.post(`${API_URL}/users/activation/`, obj);
        dispatch(authSlice.actions.setActivate(response.data));
        console.log(response.data, obj);
        localStorage.setItem("userInfo", JSON.stringify(response.data));
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

export const usersMe = (): AppThunk => async (dispatch) => {
    try {
        const response = await axios.get(`http://167.99.248.105/users/me/`, {
            headers: {
                "token": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEwMTYyOTQ2LCJpYXQiOjE3MTAxNDQ5NDYsImp0aSI6IjQxZDQ0NzE3MTU5NzQ5ZjM5YzM1ZDM0NDY0NzAwYTUyIiwidXNlcl9pZCI6MTZ9.rpfOWLCiivMwqFgR1VWLBsLCprk2PGW3oMcKj5xXVRQ`,
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            },
        });
        console.log(response)
        dispatch(authSlice.actions.setUser(response.data))
    } catch (error) {
        console.log("eRORR", error);
    }
}

export const { setAuthenticated, setUser } = authSlice.actions;

export default authSlice.reducer