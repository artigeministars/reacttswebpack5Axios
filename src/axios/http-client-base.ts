import axios, {AxiosInstance} from "axios";

export default abstract class HttpClient {
    protected readonly axiosInstance: AxiosInstance;
    private static axiosInstanceStatic: AxiosInstance;

    public constructor(baseURL: string) {
        this.axiosInstance = axios.create({
            baseURL
        });
        console.log("base base url:" + baseURL);
    }
    // for singleton approach
    public static getAxiosInstance(baseURL: string): AxiosInstance {
        this.axiosInstanceStatic = axios.create({
            baseURL
        });
        return this.axiosInstanceStatic;
    }
}
