import { Creator } from "./creator";

export interface Client {
    id: number;
    company_name: string;
    name: string;
    address: string;
    email: string;
    phone_number: string;
    created_at: string;
    created_by: Creator;
    updated_at: string;
    updated_by: Creator;
}

export interface ClientCreate {
    company_name: string;
    name: string;
    address: string;
    email: string;
    phone_number: string;
}

export interface ClientDatatable {
    draw: number;
    recordsTotal: number;
    recordsFiltered: number;
    data: Client[];
}

export interface ClientReadAll {
    status: boolean;
    message: string | string[];
    data: Client[];
}

export interface ClientRead {
    status: boolean;
    message: string;
    data: Client;
}

export interface ClientDatatableResponse {
    status: boolean;
    message: string;
    data: ClientDatatable;
}
