import IComment from "@domain/models/Comment";
import {AxiosError} from "axios";

export default interface ICommentActionTypes {
    addComment: string;
    updateComment: string;
    getComments: string;
    deleteComment: string;
    loadingComment: string;
    commentError: string;
}

export const iCommentActionTypes: ICommentActionTypes = {
    addComment: "@@Comment/addComment",
    updateComment: "@@Comment/updateComment",
    getComments: "@@Comment/getComments",
    deleteComment: "@@Comment/deleteComment",
    loadingComment: "@@Comment/loadingComment",
    commentError: "@@Comment/commentError"
};

export interface createGetCommentRequest {
    type: typeof iCommentActionTypes.getComments;
    payload: {comments: {[key: string]: IComment}};
}

export interface createAddCommentRequest {
    type: typeof iCommentActionTypes.addComment;
    payload: {post: IComment};
}

export interface createUpdateCommentRequest {
    type: typeof iCommentActionTypes.updateComment;
    payload: {post: IComment};
}

export interface createDeleteCommentRequest {
    type: typeof iCommentActionTypes.deleteComment;
    payload: {id: number};
}

export interface createErrorCommentRequest {
    type: typeof iCommentActionTypes.commentError;
    payload: {error: AxiosError<unknown>};
}

export interface createLoadingCommentRequest {
    type: typeof iCommentActionTypes.loadingComment;
}

export type commentActionTypes =
    | createAddCommentRequest
    | createDeleteCommentRequest
    | createUpdateCommentRequest
    | createGetCommentRequest
    | createErrorCommentRequest;
