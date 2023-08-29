import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { GenerateResponse } from "@/types/generate"

import { RootState } from "../store"
import { generate } from "./generate.api"

interface GenerateState {
    generate: GenerateResponse | null
    error: string | null
    loading: boolean
}

const INITIAL_STATE: GenerateState = {
    generate: null,
    error: null,
    loading: false,
}

const GenerateSlice = createSlice({
    name: "generate",
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(generate.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(
                generate.fulfilled,
                (state, action: PayloadAction<GenerateResponse>) => {
                    state.loading = false
                    state.generate = action.payload
                }
            )
            .addCase(generate.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload || "Failed to fetch data"
            })
    },
})

export const selectGenerate = (state: RootState) => state.generate
export const GenerateReducer = GenerateSlice.reducer
