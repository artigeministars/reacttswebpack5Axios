import IPost from "@domain/models/Post";
import {getPostsAsync, addPostAsync, deletePostAsync} from "@services/PostServiceC";
import {AppDispatch, RootState} from "@storages/index";
import {AnyAction, Action, ActionCreator} from "redux";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {iPostActionTypes} from "./actionTypes";
import {
    createGetPostRequest,
    createAddCommentRequest,
    createUpdateCommentRequest,
    createDeleteCommentRequest,
    createErrorCommentRequest,
    createPostLoadingRequest,
    createAllPostRequest
} from "./actionTypes";
import {initialPostState, PostState} from "./postSliceReducer";

export type AppThunk = ActionCreator<ThunkAction<void, RootState, null, Action<string>>>;

export const postsLoadingAction: ActionCreator<createPostLoadingRequest> = () => {
    return {type: iPostActionTypes.loadingPost};
};

export const getPostsAction: ActionCreator<createGetPostRequest> = (posts: IPost[]) => {
    const initialPosts: {[key: string]: NonNullable<IPost>} = {};
    posts.forEach((post) => (initialPosts[post.id] = post));
    console.info("getPostAction");
    console.log(initialPosts);
    return {
        type: iPostActionTypes.getPosts,
        payload: {posts: initialPosts}
    };
};
export const addPostAction: ActionCreator<createAddCommentRequest> = (post: Omit<IPost, "id">) => {
    return {
        type: iPostActionTypes.addPost,
        payload: {post: post}
    };
};

export const updatePostAction: ActionCreator<createUpdateCommentRequest> = (post: IPost) => {
    return {
        type: iPostActionTypes.updatePost,
        payload: {post: post}
    };
};
export const errorPostAction: ActionCreator<createErrorCommentRequest> = (error: unknown) => {
    return {
        type: iPostActionTypes.postError,
        payload: {error: error}
    };
};

export const deletePostAction: ActionCreator<createDeleteCommentRequest> = (id: number) => {
    return {
        type: iPostActionTypes.deletePost,
        payload: {id: id}
    };
};

export const getPostsThunkAction1 = (
    post: Omit<IPost, "id">
): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch: AppDispatch) => {
    dispatch(postsLoadingAction());
    console.log("loading....");
    Promise.resolve(addPostAsync(post))
        .then((promise) => addPostAction(post))
        .catch((error) => {
            console.log(error);
            errorPostAction(error);
        });
};

/*
export const getPostsThunkAction: ActionCreator<
    ThunkAction<
        Promise<void>,
        PostState,
        null,
        createGetPostRequest | createPostLoadingRequest | AnyAction
    >
> = () => {
    return async (
        dispatch: ThunkDispatch<
            PostState,
            null,
            createGetPostRequest | createPostLoadingRequest | AnyAction
        >,
        getState: () => PostState
    ) => {
        await dispatch(postsLoadingAction());
        console.log("loading...");
        await Promise.resolve(getPostsAsync())
            .then((response) => {
                dispatch(getPostsAction(response.data));
            })
            .catch((error) => {
                console.log(error);
                errorPostAction(error);
            });
    };
};
*/

export const getPostsThunkAction: ActionCreator<
    ThunkAction<
        Promise<void>,
        PostState,
        null,
        createGetPostRequest | createPostLoadingRequest | AnyAction
    >
> = () => {
    return async (dispatch: AppDispatch, getState: () => PostState) => {
        await dispatch(postsLoadingAction());
        console.log("loading...");
        await Promise.resolve(getPostsAsync())
            .then((response) => {
                dispatch(getPostsAction(response.data));
            })
            .catch((error) => {
                console.log(error);
                errorPostAction(error);
            });
    };
};

type ThunkResult<T> = ThunkAction<Promise<T>, RootState, null, createGetPostRequest>;

export const getPostsThunkActionSol: ThunkResult<void> = async (
    dispatch: AppDispatch,
    getState: PostState
) => {
    await dispatch(postsLoadingAction());
    console.log("loading...");
    await Promise.resolve(getPostsAsync())
        .then((response) => {
            dispatch(getPostsAction(response.data));
        })
        .catch((error) => {
            console.log(error);
            errorPostAction(error);
        });
};

export const addPostThunkAction = (post: Omit<IPost, "id">) => {
    return async (dispatch: AppDispatch, getState: RootState) => {
        dispatch(postsLoadingAction());
        console.log("loading....");
        Promise.resolve(addPostAsync(post))
            .then((promise) => addPostAction(post))
            .catch((error) => {
                console.log(error);
                errorPostAction(error);
            });
    };
};

export const deleteTodoThunkAction = (id: number) => {
    return async (dispatch: AppDispatch, getState: RootState) => {
        dispatch(postsLoadingAction());
        console.log("loading....");
        Promise.resolve(deletePostAsync(id))
            .then((response) => deletePostAction(id))
            .catch((error) => {
                console.log(error);
                errorPostAction(error);
            });
    };
};
