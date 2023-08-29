import { combineReducers } from "@reduxjs/toolkit"

import { ClientReducer } from "./client/client.slice"
import { GenerateReducer } from "./generate/generate.slice"
import { ItemReducer } from "./item/item.slice"
import { paymentMethodsReducer } from "./user/payment_method.slice"
import { userReducer } from "./user/user.slice"

export const rootReducer = combineReducers({
    user: userReducer,
    payment_methods: paymentMethodsReducer,
    client: ClientReducer,
    item: ItemReducer,
    generate: GenerateReducer,
})
