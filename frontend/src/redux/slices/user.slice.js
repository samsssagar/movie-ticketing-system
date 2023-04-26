import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginUser } from '../../pages/user-login/actions/user-login.actions';

const initialState = {
    id: '',
    name: '',
    email: '',
    isAdmin: false,
    access_token: ''
};

export const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        logout: (state, action) => {
            state.name = "";
            state.email = "";
            state.isAdmin = "";
            state.id = "";
            state.access_token = "";
            localStorage.removeItem("user");
        }
    },
    extraReducers: {
        [loginUser.fulfilled]: (state, action) => {
            state.name = action.payload.username;
            state.email = action.payload.email;
            state.isAdmin = action.payload.isAdmin;
            state.id = action.payload.id;
            state.access_token = action.payload.access_token;
        },
    }
});

export const { setAuthenticatedUser, resetState } = userSlice.actions;
export const userReducer = userSlice.reducer;