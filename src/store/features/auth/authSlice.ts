import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../../utils/interfacesAndTypes";

const initialState: AuthState = {
    isAuthenticated: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthenticated: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload
        }
    }
})

export const { setAuthenticated } = authSlice.actions;

export default authSlice.reducer