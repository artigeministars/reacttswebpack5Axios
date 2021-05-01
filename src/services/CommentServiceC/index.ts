import {baseAxios} from "@axios/axiosInstance";
import {generalAxiosConfig} from "@config/axios/General";
import IComment from "@domain/models/Comment";
import {AxiosRequestConfig} from "axios";

export const addComment = (comment: Omit<IComment, "id">) =>
    baseAxios.post<IComment>(
        `/posts/${comment.postId}/comments`,
        comment,
        generalAxiosConfig as AxiosRequestConfig
    );

export const addCommentAsync = async (comment: Omit<IComment, "id">) =>
    await baseAxios.post<IComment>(
        `/posts/${comment.postId}/comments`,
        comment,
        generalAxiosConfig as AxiosRequestConfig
    );

export const getComments = (postId: number) =>
    baseAxios.get<IComment[]>(
        `/posts/${postId}/comments`,
        generalAxiosConfig as AxiosRequestConfig
    );

export const getCommentsAsync = async (postId: number) =>
    await baseAxios.get<IComment[]>(
        `/posts/${postId}/comments`,
        generalAxiosConfig as AxiosRequestConfig
    );

export const updateComment = (comment: IComment) =>
    baseAxios.put<IComment>(
        `/posts/${comment.postId}/comments`,
        comment,
        generalAxiosConfig as AxiosRequestConfig
    );

export const updateCommentAsync = async (comment: IComment) =>
    await baseAxios.put<IComment>(
        `/posts/${comment.postId}/comments`,
        comment,
        generalAxiosConfig as AxiosRequestConfig
    );

export const deleteComment = (comment: IComment) =>
    baseAxios.delete<string>(
        `/posts/${comment.postId}/comments/${comment.id}`,
        generalAxiosConfig as AxiosRequestConfig
    );

export const deleteCommentAsync = async (comment: IComment) =>
    await baseAxios.delete<string>(
        `/posts/${comment.postId}/comments/${comment.id}`,
        generalAxiosConfig as AxiosRequestConfig
    );
