import {Statuses} from "@constants/StoreConstants";
import IComment from "@domain/models/Comment";
import ICommentActionTypes, {
    iCommentActionTypes,
    commentActionTypes,
    createGetCommentRequest,
    createAddCommentRequest,
    createUpdateCommentRequest,
    createDeleteCommentRequest,
    createErrorCommentRequest,
    createLoadingCommentRequest
} from "./actionTypes";

export type CommentState = {
    comments: {[key: number]: IComment};
    completed: string;
    error?: string | null;
};

export const initialCommentState: CommentState = {
    comments: {},
    completed: Statuses.idle,
    error: null
};

export const commentsSliceReducer = (
    state = initialCommentState,
    action: /* commentActionTypes */
    | createLoadingCommentRequest
        | createErrorCommentRequest
        | createGetCommentRequest
        | createAddCommentRequest
        | createUpdateCommentRequest
        | createDeleteCommentRequest
): CommentState => {
    switch (action.type) {
        case iCommentActionTypes.loadingComment: {
            return {
                ...state,
                completed: Statuses.loading
            };
        }
        case iCommentActionTypes.commentError: {
            return {
                ...state,
                error: action.payload.error
            };
        }
        case iCommentActionTypes.getComments: {
            const newComments: {[key: string]: NonNullable<IComment>} = {};
            action.payload.comments.forEach((comment) => (newComments[comment.id] = comment));
            return {
                ...state,
                comments: {
                    ...state.comments,
                    ...newComments
                },
                completed: Statuses.idle
            };
        }
        case iCommentActionTypes.addComment: {
            const comment: IComment = action.payload.comment;
            return {
                ...state,
                comments: {
                    ...state.comments,
                    [comment.id]: comment
                },
                completed: Statuses.idle
            };
        }
        case iCommentActionTypes.updateComment: {
            const comment: IComment = action.payload.comment;
            return {
                ...state,
                comments: {
                    ...state.comments,
                    [comment.id]: comment
                },
                completed: Statuses.idle
            };
        }
        case iCommentActionTypes.deleteComment: {
            const todoId = action.payload.id;
            const newComments = {...state.comments};
            return {
                ...state,
                comments: {
                    ...state.comments,
                    ...newComments
                },
                completed: Statuses.idle
            };
        }
        default:
            return state;
    }
};
