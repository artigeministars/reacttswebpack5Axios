import {PostState} from "@features/Posts/postSliceReducer";

export const selectPosts = (state: PostState) => state.posts;
export const selectPostsIds = (state: PostState): number[] | undefined => {
    return Object.values(state.posts).map((post) => post.id);
};
export const selectPostById = (state: PostState, postId: number) => {
    return selectPosts(state)[postId];
};
