import axios, {CancelToken, CancelTokenSource, AxiosRequestConfig} from "axios";
import {POST_CONSTANTS} from "@constants/PostConstants";

export interface IAxiosPostsConfig extends IAxiosConfig {
    [key: string]: unknown;
    cancelToken: CancelToken;
    timeout?: number;
}

export type ServerError = {
    code: string;
    description: string;
};

const cancelToken = axios.CancelToken;
export let cancelTokenSource: CancelTokenSource = cancelToken.source();
export const setCancelTokenSource = (CTS: CancelTokenSource): void => {
    cancelTokenSource = CTS;
};

export const generalAxiosConfig: IAxiosPostsConfig = {
    baseURL: POST_CONSTANTS.POSTBASEURL,
    cancelToken: cancelTokenSource.token,
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 5000
};
