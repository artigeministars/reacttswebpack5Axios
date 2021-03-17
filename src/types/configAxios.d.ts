interface IAxiosConfig {
    [key: string]: unknown;
    baseURL: string;
    responseType?: string;
    headers?: Record<string, unknown>;
    timeout?: number;
}
