import { createAsyncThunk } from "@reduxjs/toolkit"
// import { axiosInstance } from "../../../axios/axios";
import axios from "axios";

export const loginUser = createAsyncThunk(
    "userSlice/loginUser", async (data) => {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/auth/login`, { username: data.username, password: data.password });
        return res.data;
    }
)