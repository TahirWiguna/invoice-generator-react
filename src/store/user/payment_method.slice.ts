import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
// import { axios, privateAxios } from "@/api/axios";

import {
    PaymentMethod,
    PaymentMethodDatatableResponse,
    PaymentMethodDatatable,
    PaymentMethodReadAll,
    PaymentMethodRead,
} from "@/types/payment_method";
import { RootState, store } from "../store";
import { ValidationErrors } from "@/types/response";

interface PaymentMethodState {
    payment_methods: PaymentMethodReadAll | null;
    error: string | null;
    loading: boolean;
}

interface PostType {
    draw: number;
    start: number;
    length: number;
}

interface createPaymentMethodType {
    name: string;
}

const INITIAL_STATE: PaymentMethodState = {
    payment_methods: null,
    error: null,
    loading: false,
};

// export const getPaymentMethodData = createAsyncThunk<
//     PaymentMethodDatatableResponse,
//     PostType,
//     { rejectValue: string }
// >("payment_methods/fetch", async (postData, { rejectWithValue, getState }) => {
//     try {
//         const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;
//         const BACKEND_API_VERSION = import.meta.env.VITE_BACKEND_API_VERSION;
//         const URL = `${BACKEND_API_URL}/${BACKEND_API_VERSION}/api/payment_method/datatable`;

//         const state = getState() as RootState;
//         const token = state.user.user?.token;

//         console.log("response.start");
//         const response = await axios.post<PaymentMethodDatatableResponse>(URL, postData, {
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//         console.log("response.data", response);
//         return response.data;
//     } catch (error) {
//         let err = error as AxiosError<ValidationErrors>;
//         if (!err.response) {
//             return rejectWithValue(err.message);
//         }
//         return rejectWithValue(err.response.data.message);
//     }
// });

export const getPaymentMethodData = createAsyncThunk<PaymentMethodReadAll, void, { rejectValue: string }>(
    "payment_methods/fetch",
    async (_, { rejectWithValue, getState }) => {
        try {
            const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;
            const BACKEND_API_VERSION = import.meta.env.VITE_BACKEND_API_VERSION;
            console.log("BACKEND_API_URL", BACKEND_API_URL);
            // console.log(i)
            const URL = `${BACKEND_API_URL}/${BACKEND_API_VERSION}/api/payment_method/findAll`;

            const state = getState() as RootState;
            const token = state.user.user?.token;

            const response = await axios.get<PaymentMethodReadAll>(URL, {
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

export const createPaymentMethod = createAsyncThunk<
    PaymentMethodReadAll,
    createPaymentMethodType,
    { rejectValue: string }
>("payment_methods/create", async (postData, { rejectWithValue, getState }) => {
    try {
        const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;
        const BACKEND_API_VERSION = import.meta.env.VITE_BACKEND_API_VERSION;
        const URL = `${BACKEND_API_URL}/${BACKEND_API_VERSION}/api/payment_method/create`;

        const state = getState() as RootState;
        const token = state.user.user?.token;

        const response = await axios.post<PaymentMethodReadAll>(URL, postData, {
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
});

export const getPaymentMethodById = createAsyncThunk<PaymentMethodRead, number, { rejectValue: string }>(
    "payment_methods/getById",
    async (id, { rejectWithValue, getState }) => {
        try {
            const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;
            const BACKEND_API_VERSION = import.meta.env.VITE_BACKEND_API_VERSION;
            const URL = `${BACKEND_API_URL}/${BACKEND_API_VERSION}/api/payment_method/findById/${id}`;

            const state = getState() as RootState;
            const token = state.user.user?.token;

            const response = await axios.get<PaymentMethodRead>(URL, {
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

export const updatePaymentMethod = createAsyncThunk(
    "payment_methods/update",
    async (postData: { id: number; data: { name: string } }, { rejectWithValue, getState }) => {
        try {
            const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;
            const BACKEND_API_VERSION = import.meta.env.VITE_BACKEND_API_VERSION;
            const URL = `${BACKEND_API_URL}/${BACKEND_API_VERSION}/api/payment_method/edit/${postData.id}`;

            const state = getState() as RootState;
            const token = state.user.user?.token;

            const response = await axios.put<PaymentMethodRead>(URL, postData.data, {
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

export const deletePaymentMethod = createAsyncThunk(
    "payment_methods/delete",
    async (id: number, { rejectWithValue, getState }) => {
        try {
            const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;
            const BACKEND_API_VERSION = import.meta.env.VITE_BACKEND_API_VERSION;
            const URL = `${BACKEND_API_URL}/${BACKEND_API_VERSION}/api/payment_method/delete/${id}`;

            const state = getState() as RootState;
            const token = state.user.user?.token;

            const response = await axios.delete(URL, {
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

const paymentMethodsSlice = createSlice({
    name: "payment_methods",
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPaymentMethodData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPaymentMethodData.fulfilled, (state, action: PayloadAction<PaymentMethodReadAll>) => {
                state.loading = false;
                state.payment_methods = action.payload;
            })
            .addCase(getPaymentMethodData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch data";
            });
    },
});

export const selectPaymentMethods = (state: RootState) => state.payment_methods;
export const paymentMethodsReducer = paymentMethodsSlice.reducer;
