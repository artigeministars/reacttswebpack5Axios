import IPost from "@domain/models/Post";
import {AxiosError} from "axios";

export default interface IPostActionTypes {
    addPost: string;
    updatePost: string;
    getPosts: string;
    deletePost: string;
    loadingPost: string;
    postError: string;
}

export const iPostActionTypes: IPostActionTypes = {
    addPost: "@@Post/addTodo",
    updatePost: "@@Post/updateTodo",
    getPosts: "@@Post/getTodos",
    deletePost: "@@Post/deleteTodo",
    loadingPost: "@@Post/loadingTodo",
    postError: "@@Post/todoError"
};

export interface createGetPostRequest {
    type: typeof iPostActionTypes.getPosts;
    payload: {posts: {[key: string]: IPost}};
    // payload: {[key: string]: IPost}
    //    payload: {posts: Array<IPost>};
}

export interface createAddPostRequest {
    type: typeof iPostActionTypes.addPost;
    payload: {post: IPost};
}

export interface createUpdatePostRequest {
    type: typeof iPostActionTypes.updatePost;
    payload: {post: IPost};
}

export interface createDeletePostRequest {
    type: typeof iPostActionTypes.deletePost;
    payload: {id: string};
}

export interface createErrorPostRequest {
    type: typeof iPostActionTypes.postError;
    payload: {error: AxiosError};
}

export interface createPostLoadingRequest {
    type: typeof iPostActionTypes.loadingPost;
}

export interface createAllPostRequest {
    type:
        | typeof iPostActionTypes.getPosts
        | typeof iPostActionTypes.addPost
        | typeof iPostActionTypes.deletePost
        | typeof iPostActionTypes.postError
        | typeof iPostActionTypes.updatePost
        | typeof iPostActionTypes.loadingPost;

    payload:
        | {posts: Array<IPost>}
        | {post: IPost}
        | {id: number}
        | {error: AxiosError}
        | {completed: string};
}

export type postActionTypes =
    | createAddPostRequest
    | createDeletePostRequest
    | createUpdatePostRequest
    | createGetPostRequest
    | createErrorPostRequest
    | createPostLoadingRequest;
