import { createAsyncThunk } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios"

import { GeneratePost, GenerateResponse } from "@/types/generate"
import { ValidationErrors } from "@/types/response"

import { RootState } from "../store"

export const generate = createAsyncThunk<
    GenerateResponse,
    GeneratePost,
    { rejectValue: string }
>("generate/fetch", async (postData, { rejectWithValue, getState }) => {
    try {
        const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL
        const BACKEND_API_VERSION = import.meta.env.VITE_BACKEND_API_VERSION
        const URL = `${BACKEND_API_URL}/${BACKEND_API_VERSION}/api/invoice/generate`

        const state = getState() as RootState
        const token = state.user.user?.token

        const response = await axios.post<GenerateResponse>(URL, postData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data
    } catch (error) {
        let err = error as AxiosError<ValidationErrors>
        console.log("err", err)
        if (!err.response) {
            return rejectWithValue(err.message)
        }
        return rejectWithValue(err.response.data.message)
    }
})
