import { Creator } from "./creator"

export interface PaymentMethod {
    id: number
    name: string
    deleted: boolean
    created_at: string
    created_by: string
    updated_at: string
    updated_by: string
    creator: Creator
}

export interface PaymentMethodDatatable {
    draw: number
    recordsTotal: number
    recordsFiltered: number
    data: PaymentMethod[]
}

export interface PaymentMethodReadAll {
    status: boolean
    message: string | string[]
    data: PaymentMethod[]
}

export interface PaymentMethodRead {
    status: boolean
    message: string
    data: PaymentMethod
}

export interface PaymentMethodDatatableResponse {
    status: boolean
    message: string
    data: PaymentMethodDatatable
}
