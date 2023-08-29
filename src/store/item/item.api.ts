import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Item, ItemCreate, ItemRead, ItemReadAll } from "@/types/item";
import axios, { AxiosError } from "axios";
import { ValidationErrors } from "@/types/response";

export const getItem = createAsyncThunk<ItemReadAll, void, { rejectValue: string }>(
    "items/fetch",
    async (_, { rejectWithValue, getState }) => {
        try {
            const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;
            const BACKEND_API_VERSION = import.meta.env.VITE_BACKEND_API_VERSION;
            console.log("BACKEND_API_URL", BACKEND_API_URL);
            // console.log(i)
            const URL = `${BACKEND_API_URL}/${BACKEND_API_VERSION}/api/item/findAll`;

            const state = getState() as RootState;
            const token = state.user.user?.token;

            const response = await axios.get<ItemReadAll>(URL, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            let err = error as AxiosError<ValidationErrors>;
            console.log("err", err);
            if (!err.response) {
                return rejectWithValue(err.message);
            }
            return rejectWithValue(err.response.data.message);
        }
    }
);

export const createItem = createAsyncThunk<ItemReadAll, ItemCreate, { rejectValue: string | ValidationErrors }>(
    "items/create",
    async (postData, { rejectWithValue, getState }) => {
        try {
            const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;
            const BACKEND_API_VERSION = import.meta.env.VITE_BACKEND_API_VERSION;
            console.log("BACKEND_API_URL", BACKEND_API_URL);
            // console.log(i)
            const URL = `${BACKEND_API_URL}/${BACKEND_API_VERSION}/api/item/create`;

            const state = getState() as RootState;
            const token = state.user.user?.token;

            const response = await axios.post<ItemReadAll>(URL, postData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            let err = error as AxiosError<ValidationErrors>;
            if (!err.response) {
                return rejectWithValue(err.message);
            }
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteItem = createAsyncThunk<ItemRead, number, { rejectValue: string }>(
    "items/delete",
    async (id, { rejectWithValue, getState }) => {
        try {
            const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;
            const BACKEND_API_VERSION = import.meta.env.VITE_BACKEND_API_VERSION;
            console.log("BACKEND_API_URL", BACKEND_API_URL);
            // console.log(i)
            const URL = `${BACKEND_API_URL}/${BACKEND_API_VERSION}/api/item/delete/${id}`;

            const state = getState() as RootState;
            const token = state.user.user?.token;

            const response = await axios.delete<ItemRead>(URL, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            let err = error as AxiosError<ValidationErrors>;
            if (!err.response) {
                return rejectWithValue(err.message);
            }
            return rejectWithValue(err.response.data.message);
        }
    }
);

export const getItemById = createAsyncThunk<ItemRead, number, { rejectValue: string }>(
    "items/getById",
    async (id, { rejectWithValue, getState }) => {
        try {
            const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;
            const BACKEND_API_VERSION = import.meta.env.VITE_BACKEND_API_VERSION;
            const URL = `${BACKEND_API_URL}/${BACKEND_API_VERSION}/api/item/findById/${id}`;

            const state = getState() as RootState;
            const token = state.user.user?.token;

            const response = await axios.get<ItemRead>(URL, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            let err = error as AxiosError<ValidationErrors>;
            if (!err.response) {
                return rejectWithValue(err.message);
            }
            return rejectWithValue(err.response.data.message);
        }
    }
);

export const updateItem = createAsyncThunk(
    "items/update",
    async (postData: { id: number; data: ItemCreate }, { rejectWithValue, getState }) => {
        try {
            const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;
            const BACKEND_API_VERSION = import.meta.env.VITE_BACKEND_API_VERSION;
            const URL = `${BACKEND_API_URL}/${BACKEND_API_VERSION}/api/item/edit/${postData.id}`;

            const state = getState() as RootState;
            const token = state.user.user?.token;

            const response = await axios.put<ItemRead>(URL, postData.data, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            let err = error as AxiosError<ValidationErrors>;
            if (!err.response) {
                return rejectWithValue(err.message);
            }
            return rejectWithValue(err.response.data.message);
        }
    }
);
