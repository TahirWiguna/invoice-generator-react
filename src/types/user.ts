export interface User {
    token: string;
    user: UserDetail;
}

export interface UserDetail {
    id: number;
    name: string;
    username: string;
}

export interface UserResponse {
    status: boolean;
    message: string;
    data: User;
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface AuthState {
    user: User | null;
    // status: "idle" | "loading" | "succeeded" | "failed";
    loading: boolean;
    error: string | null;
}
