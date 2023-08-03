import { combineReducers } from "@reduxjs/toolkit";

import { userReducer } from "./user/user.slice";
import { paymentMethodsReducer } from "./user/payment_method.slice";
import { ClientReducer } from "./client/client.slice";

export const rootReducer = combineReducers({
    user: userReducer,
    payment_methods: paymentMethodsReducer,
    client: ClientReducer,
});
