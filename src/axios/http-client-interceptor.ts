import axios, {AxiosInstance, AxiosResponse, AxiosRequestConfig} from "axios";

/*
declare module "axios" {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type AxiosResponse<T = any> = Promise<T>;
}
*/
export default abstract class HttpClienrInterceptor {
    protected readonly axiosInstance: AxiosInstance;

    public constructor(baseURL: string) {
        this.axiosInstance = axios.create({
            baseURL
        });
        this._initializeResponseInterceptor();
        this._initializeRequestInterceptor();
    }

    private _initializeResponseInterceptor = () => {
        this.axiosInstance.interceptors.response.use(this._handleResponse, this._handleError);
    };

    private _initializeRequestInterceptor = () => {
        this.axiosInstance.interceptors.request.use(this._handleRequest, this._handleError);
    };

    private _handleResponse = ({data}: AxiosResponse) => {
        console.log("handleResponse interceptor....");
        return data;
    };

    private _handleRequest = (config: AxiosRequestConfig) => {
        config.headers["Authorization"] = "Bearer ...";
        console.log("handleRequest interceptor....");
        return config;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    protected _handleError = (error: any) => Promise.reject(error);
}
