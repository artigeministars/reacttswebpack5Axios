import IComment from "@domain/models/Comment";
import {AppDispatch, RootState} from "@storages/index";
import {ActionCreator, Action} from "redux";
import {ThunkAction} from "redux-thunk";
import {
    iCommentActionTypes,
    createLoadingCommentRequest,
    createGetCommentRequest
} from "./actionTypes";
import {deleteCommentAsync, getCommentsAsync, updateCommentAsync} from "@services/CommentServiceC";

export type AppThunk = ActionCreator<ThunkAction<void, RootState, null, Action<string>>>;

export const commentLoadingAction: ActionCreator<createLoadingCommentRequest> = () => {
    return {
        type: iCommentActionTypes.loadingComment
    };
};

export const getCommentsAction: ActionCreator<createGetCommentRequest> = (comments: IComment[]) => {
    const initialComments: {[key: string]: NonNullable<IComment>} = {};
    comments.forEach((comment) => (initialComments[comment.id] = comment));
    return {
        type: iCommentActionTypes.getComments,
        payload: {comments: initialComments}
    };
};

export const addCommentAction: ActionCreator<void> = (comment: IComment) => {
    return {
        type: iCommentActionTypes.addComment,
        payload: {comment: comment}
    };
};

export const updateCommentAction: ActionCreator<void> = (comment: IComment) => {
    return {
        type: iCommentActionTypes.updateComment,
        payload: {comment: comment}
    };
};

export const errorCommentAction: ActionCreator<void> = (error: unknown) => {
    return {
        type: iCommentActionTypes.commentError,
        payload: {error: error}
    };
};

export const deleteCommentAction: ActionCreator<void> = (id: number) => {
    return {
        type: iCommentActionTypes.deleteComment,
        payload: {id: id}
    };
};

export const getCommentsThunkAction1: AppThunk = (postId: number) => {
    return async (dispatch: AppDispatch) => {
        dispatch(commentLoadingAction());
        console.log("loading...");
        Promise.resolve(getCommentsAsync(postId))
            .then((promise) => {
                getCommentsAction(promise.data);
            })
            .catch((error) => {
                console.log(error);
                errorCommentAction(error);
            });
    };
};

export const getCommentsThunkAction: AppThunk = (postId: number) => async (
    dispatch: AppDispatch
) => {
    dispatch(commentLoadingAction());
    console.log("loading...");
    Promise.resolve(getCommentsAsync(postId))
        .then((promise) => {
            getCommentsAction(promise.data);
        })
        .catch((error) => {
            console.error(error);
            errorCommentAction(error);
        });
};

export const updateCommentThunkAction: AppThunk = (comment: IComment) => async (
    dispatch: AppDispatch
) => {
    dispatch(commentLoadingAction());
    console.log("loading...");
    Promise.resolve(updateCommentAsync(comment))
        .then((promise) => {
            updateCommentAction(promise.data);
        })
        .catch((error) => {
            console.error(error);
            errorCommentAction(error);
        });
};

export const deleteCommentThunkAction: AppThunk = (comment: IComment) => async (
    dispatch: AppDispatch
) => {
    dispatch(commentLoadingAction());
    console.log("loading...");
    Promise.resolve(deleteCommentAsync(comment))
        .then((promise) => {
            deleteCommentAction(comment.id);
        })
        .catch((error) => {
            console.error(error);
            errorCommentAction(error);
        });
};
