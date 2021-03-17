import HttpClient from "@axios/http-client-base";
import IPost from "@domain/models/Post";
import {generalAxiosConfig} from "@config/axios/General";
import {AxiosRequestConfig} from "axios";
import {POST_CONSTANTS} from "@constants/PostConstants";

class PostApiClass extends HttpClient {
    public constructor(baseUrl: string) {
        super(baseUrl);
    }

    public getPosts = () =>
        this.axiosInstance.get<IPost[]>("/posts", generalAxiosConfig as AxiosRequestConfig);

    public getPost = (id: string) =>
        this.axiosInstance.get<IPost>(`/post/${id}`, generalAxiosConfig as AxiosRequestConfig);

    public addPost = (post: IPost) =>
        this.axiosInstance.post<IPost>("/posts", post, generalAxiosConfig as AxiosRequestConfig);

    public updatePost = (post: IPost) =>
        this.axiosInstance.put<IPost>(
            `/posts/${post.id}`,
            post,
            generalAxiosConfig as AxiosRequestConfig
        );
    public deletePost = (id: string) =>
        this.axiosInstance.delete<IPost>(`/posts/${id}`, generalAxiosConfig as AxiosRequestConfig);

    // for singleton approach
    public static getPostsStatic = () =>
        HttpClient.getAxiosInstance(POST_CONSTANTS.POSTBASEURL).get<IPost[]>(
            "/posts",
            generalAxiosConfig as AxiosRequestConfig
        );

    public static getPostStatic = (id: string) =>
        HttpClient.getAxiosInstance(POST_CONSTANTS.POSTBASEURL).get<IPost>(
            `/post/${id}`,
            generalAxiosConfig as AxiosRequestConfig
        );

    public static addPostStatic = (post: IPost) =>
        HttpClient.getAxiosInstance(POST_CONSTANTS.POSTBASEURL).post<IPost>(
            "/posts",
            post,
            generalAxiosConfig as AxiosRequestConfig
        );

    public static updatePostStatic = (post: IPost) =>
        HttpClient.getAxiosInstance(POST_CONSTANTS.POSTBASEURL).put<IPost>(
            `/posts/${post.id}`,
            post,
            generalAxiosConfig as AxiosRequestConfig
        );
    public static deletePostStatic = (id: string) =>
        HttpClient.getAxiosInstance(POST_CONSTANTS.POSTBASEURL).delete<IPost>(
            `/posts/${id}`,
            generalAxiosConfig as AxiosRequestConfig
        );
}

export default PostApiClass;
