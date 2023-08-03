import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { getClient } from "./client.api";
import { ClientReadAll } from "@/types/client";

interface ClientState {
    clients: ClientReadAll | null;
    error: string | null;
    loading: boolean;
}

const INITIAL_STATE: ClientState = {
    clients: null,
    error: null,
    loading: false,
};

const ClientSlice = createSlice({
    name: "client",
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getClient.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getClient.fulfilled, (state, action: PayloadAction<ClientReadAll>) => {
                state.loading = false;
                state.clients = action.payload;
            })
            .addCase(getClient.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch data";
            });
    },
});

export const selectClient = (state: RootState) => state.client;
export const ClientReducer = ClientSlice.reducer;
