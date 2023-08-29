import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { getItem } from "./item.api";
import { ItemReadAll } from "@/types/item";

interface ItemState {
    items: ItemReadAll | null;
    error: string | null;
    loading: boolean;
}

const INITIAL_STATE: ItemState = {
    items: null,
    error: null,
    loading: false,
};

const ItemSlice = createSlice({
    name: "item",
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getItem.fulfilled, (state, action: PayloadAction<ItemReadAll>) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(getItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch data";
            });
    },
});

export const selectItem = (state: RootState) => state.item;
export const ItemReducer = ItemSlice.reducer;
