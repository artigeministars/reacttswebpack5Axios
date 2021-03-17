export const configBase: IAxiosConfig = {
    baseURL: "https://yoursite.com/api",
    responseType: "json",
    headers: {
        "Content-Type": "application/json"
    }
};
// transformRequest , transformResponse for type transformation
