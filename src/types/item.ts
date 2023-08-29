import { Creator } from "./creator";

export interface Item {
    id: number;
    name: string;
    description: string;
    price: string;
    created_at: string;
    created_by: Creator;
    updated_at: string;
    updated_by: Creator;
}

export interface ItemCreate {
    name: string;
    price: string;
    description: string;
}

export interface ItemDatatable {
    draw: number;
    recordsTotal: number;
    recordsFiltered: number;
    data: Item[];
}

export interface ItemReadAll {
    status: boolean;
    message: string | string[];
    data: Item[];
}

export interface ItemRead {
    status: boolean;
    message: string;
    data: Item;
}

export interface ItemDatatableResponse {
    status: boolean;
    message: string;
    data: ItemDatatable;
}
