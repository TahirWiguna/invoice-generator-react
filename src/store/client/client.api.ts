import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Client, ClientCreate, ClientRead, ClientReadAll } from "@/types/client";
import axios, { AxiosError } from "axios";
import { ValidationErrors } from "@/types/response";

export const getClient = createAsyncThunk<ClientReadAll, void, { rejectValue: string }>(
    "clients/fetch",
    async (_, { rejectWithValue, getState }) => {
        try {
            const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;
            const BACKEND_API_VERSION = import.meta.env.VITE_BACKEND_API_VERSION;
            console.log("BACKEND_API_URL", BACKEND_API_URL);
            // console.log(i)
            const URL = `${BACKEND_API_URL}/${BACKEND_API_VERSION}/api/client/findAll`;

            const state = getState() as RootState;
            const token = state.user.user?.token;

            const response = await axios.get<ClientReadAll>(URL, {
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

export const createClient = createAsyncThunk<ClientReadAll, ClientCreate, { rejectValue: string }>(
    "clients/create",
    async (postData, { rejectWithValue, getState }) => {
        try {
            const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;
            const BACKEND_API_VERSION = import.meta.env.VITE_BACKEND_API_VERSION;
            console.log("BACKEND_API_URL", BACKEND_API_URL);
            // console.log(i)
            const URL = `${BACKEND_API_URL}/${BACKEND_API_VERSION}/api/client/create`;

            const state = getState() as RootState;
            const token = state.user.user?.token;

            const response = await axios.post<ClientReadAll>(URL, postData, {
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

export const deleteClient = createAsyncThunk<ClientRead, number, { rejectValue: string }>(
    "clients/delete",
    async (id, { rejectWithValue, getState }) => {
        try {
            const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;
            const BACKEND_API_VERSION = import.meta.env.VITE_BACKEND_API_VERSION;
            console.log("BACKEND_API_URL", BACKEND_API_URL);
            // console.log(i)
            const URL = `${BACKEND_API_URL}/${BACKEND_API_VERSION}/api/client/delete/${id}`;

            const state = getState() as RootState;
            const token = state.user.user?.token;

            const response = await axios.delete<ClientRead>(URL, {
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

export const getClientById = createAsyncThunk<ClientRead, number, { rejectValue: string }>(
    "clients/getById",
    async (id, { rejectWithValue, getState }) => {
        try {
            const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;
            const BACKEND_API_VERSION = import.meta.env.VITE_BACKEND_API_VERSION;
            const URL = `${BACKEND_API_URL}/${BACKEND_API_VERSION}/api/client/findById/${id}`;

            const state = getState() as RootState;
            const token = state.user.user?.token;

            const response = await axios.get<ClientRead>(URL, {
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

export const updateClient = createAsyncThunk(
    "clients/update",
    async (postData: { id: number; data: ClientCreate }, { rejectWithValue, getState }) => {
        try {
            const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;
            const BACKEND_API_VERSION = import.meta.env.VITE_BACKEND_API_VERSION;
            const URL = `${BACKEND_API_URL}/${BACKEND_API_VERSION}/api/client/edit/${postData.id}`;

            const state = getState() as RootState;
            const token = state.user.user?.token;

            const response = await axios.put<ClientRead>(URL, postData.data, {
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
