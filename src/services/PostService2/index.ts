import HttpClient from "@axios/http-client-base";
import {generalAxiosConfig} from "@config/axios/General";
import {POST_CONSTANTS} from "@constants/PostConstants";
import IPost from "@domain/models/Post";
import {AxiosRequestConfig} from "axios";

export class PostService2 extends HttpClient {
    private static classInstance?: PostService2;

    private constructor() {
        super(POST_CONSTANTS.POSTBASEURL);
    }

    public static getInstance() {
        if (!this.classInstance) {
            this.classInstance = new PostService2();
        }
        return this.classInstance;
    }

    public getPosts = () => this.axiosInstance.get<IPost[]>("/posts");

    public deletePost = (id: string) => this.axiosInstance.get<IPost>(`/posts/${id}`);

    public updatePost = (post: IPost) =>
        this.axiosInstance.put<IPost>(
            `/posts/${post.id}`,
            post,
            generalAxiosConfig as AxiosRequestConfig
        );

    public addPost = (post: IPost) =>
        this.axiosInstance.post<IPost>("/posts", post, generalAxiosConfig as AxiosRequestConfig);
}
