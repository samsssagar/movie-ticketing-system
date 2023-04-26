import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    email: '',
    access_token: ''
};

export const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        setAuthenticatedUser: (state, action) => {
            state.isAdmin = action.payload.name;
            state.email = action.payload.email;
            state.access_token = action.payload.access_token;
        },
        resetState: (state, action) => {
            state.access_token = '';
            state.email = '';
            state.isAdmin = false;
        }
    }
});

export const { setAuthenticatedUser, resetState } = authSlice.actions;
export const authReducer = authSlice.reducer;