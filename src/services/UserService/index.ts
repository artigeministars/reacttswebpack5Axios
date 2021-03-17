import HttpClient from "@axios/http-client-base";
/* import { User } from "./types"; */

class UserApi<T> extends HttpClient {
    public constructor() {
        super("https://api.awesome-site.com");
    }

    /* pıblic getUsers = () => this.axiosInstance.get<User[]>('/users');  */
    public getUsers = () => this.axiosInstance.get<T[]>("/users");

    /* public getUser = (id: string) => this.axiosInstance.get<User>('/user');  */
    public getUser = (id: string) => this.axiosInstance.get<T>("/user");
}
