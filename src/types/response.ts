export interface ValidationErrors {
    status: boolean;
    message: string;
    data: {
        message: string;
        path: string[];
        type: string;
        context: {
            label: string;
            value: string;
            key: string;
        };
    }[];
}
