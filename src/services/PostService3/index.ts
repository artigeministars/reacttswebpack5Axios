import {baseAxios} from "@axios/axiosInstance";
import IPost from "@domain/models/Post";
import {AxiosRequestConfig} from "axios";

const postApi = (() => {
    const post = (url: string, data: IPost[], config: AxiosRequestConfig | undefined) =>
        baseAxios.post<IPost>(url, data, config);
    const get = (url: string, config?: AxiosRequestConfig) => baseAxios.get<IPost[]>(url, config);

    return {
        post,
        get
    };
})();

export default postApi;
