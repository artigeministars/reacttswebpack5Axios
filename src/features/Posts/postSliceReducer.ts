import IPost from "@domain/models/Post";
import {Statuses} from "@constants/StoreConstants";
import {
    iPostActionTypes,
    postActionTypes,
    createGetPostRequest,
    createAddPostRequest,
    createUpdatePostRequest,
    createDeletePostRequest,
    createErrorPostRequest,
    createAllPostRequest
} from "./actionTypes";
import {AnyAction} from "redux";

export type entityType = IPost;

export type PostState = {
    //   posts: Record<string, string>;
    posts: {[key: number]: IPost};
    completed: string;
    error?: string | null;
};

export const initialPostState: PostState = {
    posts: {
        [1]: {
            userId: 1,
            id: 1,
            title: "bla bla blaaa",
            body: "body"
        }
    },
    completed: Statuses.idle,
    error: null
};

export const postSliceReducer = (
    state = initialPostState,
    action: /* createAllPostRequest */
    | createGetPostRequest
        | createAddPostRequest
        | createUpdatePostRequest
        | createDeletePostRequest
        | createErrorPostRequest
): PostState => {
    switch (action.type) {
        case iPostActionTypes.getPosts: {
            // const newPosts: {[key: number]: NonNullable<IPost>} = {};
            // // const newPosts: Partially<Record<id in IPost, IPost>> = {};
            // action.payload.posts.forEach((post) => (newPosts[post.id] = post));
            /*
               Object.values(newEntities).forEach((todo) => {
               if (todo.completed) {
               delete newEntities[todo.id]
               }
               })
            */

            return {
                ...state,
                posts: {
                    ...state.posts,
                    ...action.payload.posts
                    // ...newPosts
                },
                completed: Statuses.idle
            };
        }
        case iPostActionTypes.addPost: {
            const post: IPost = action.payload.post;
            return {
                ...state,
                posts: {
                    ...state.posts,
                    [post.id]: post
                },
                completed: Statuses.idle
            };
        }
        case iPostActionTypes.updatePost: {
            const post: IPost = action.payload.post;

            return {
                ...state,
                posts: {
                    ...state.posts,
                    [post.id]: post
                },
                completed: Statuses.idle
            };
        }
        case iPostActionTypes.deletePost: {
            const todoId = action.payload.id;
            const newPosts = {...state.posts};
            /*
               Object.values(newEntities).forEach((todo) => {
               if (todo.completed) {
               delete newEntities[todo.id]
              }
              })
            */
            delete newPosts[todoId];
            return {
                ...state,
                posts: {
                    ...state.posts,
                    ...newPosts
                },
                completed: Statuses.idle
            };
        }
        case iPostActionTypes.loadingPost: {
            return {
                ...state,
                completed: Statuses.loading
            };
        }
        case iPostActionTypes.postError: {
            return {
                ...state,
                error: action.payload.error
            };
        }
        default:
            return state;
    }
};
