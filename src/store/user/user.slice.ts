import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { AuthState, LoginCredentials, UserResponse } from "@/types/user";
import { RootState } from "../store";
import { ValidationErrors } from "@/types/response";

const INITIAL_STATE: AuthState = {
    user: null,
    error: null,
    loading: false,
};

export const loginUser = createAsyncThunk<UserResponse, LoginCredentials, { rejectValue: string }>(
    "auth/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post<UserResponse>("http://127.0.0.1:3000/v1/api/auth/login", credentials);
            return response.data;
        } catch (error) {
            let err = error as AxiosError<ValidationErrors>;
            if (!err.response) {
                throw err.message;
            }
            return rejectWithValue(err.response.data.message);
        }
    }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
    return true;
});

const userSlice = createSlice({
    name: "auth",
    initialState: INITIAL_STATE,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<UserResponse>) => {
                state.loading = false;
                state.user = action.payload.data;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to login";
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
            })
            .addCase(logoutUser.rejected, (state) => {
                state.loading = false;
                state.error = "Failed to logout";
            });
    },
});

export const { setUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export const selectToken = (state: RootState) => state.user.user?.token;
export const userReducer = userSlice.reducer;
