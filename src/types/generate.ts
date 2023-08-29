import { Client } from "./client"
import { Item } from "./item"

export interface Generate {
    id: number
    due_date: string
    client_id: string
    total_amount: string
    amount_paid: string
    payment_method_id: string
    payment_date: string
    status: string
    deleted: boolean
    created_at: string
    created_by: string
    updated_at: string
    updated_by: string
    items: Item[]
    client: Client
}

export interface GenerateResponse {
    status: boolean
    message: string
    data: Generate
}

export interface GeneratePost {
    due_date: string
    client_id: string
    items: {
        id: string
        qty: string
    }[]
    payment_method_id: string
}
