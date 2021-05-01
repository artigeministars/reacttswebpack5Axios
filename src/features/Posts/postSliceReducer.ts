import IPost from "@domain/models/Post";
import {
    createSlice,
    createEntityAdapter,
    createAsyncThunk,
    createSelector,
    PayloadAction,
    createReducer
} from "@reduxjs/toolkit";
import {getPostsAsync} from "@services/PostServiceC";
import {RootState} from "@storages/index";
type Post = IPost;

export const postAdapter = createEntityAdapter<Post>({
    selectId: (post) => post.id,
    sortComparer: (a, b) => a.title.localeCompare(b.title)
});
export const initialState = postAdapter.getInitialState({
    status: "idle",
    error: ""
});

/**** async Thunks */

export const fetchPostsThunkAction = createAsyncThunk("@@Post/getPosts", async () => {
    /*
    Promise.resolve(getPostsAsync())
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return {error: error};
        });
*/
    try {
        return (await getPostsAsync()).data;
    } catch (error) {
        return <string>error;
    }
});

/* selectors */
export const {
    selectAll: selectAllPosts,
    selectById: selectPostById
} = postAdapter.getSelectors<RootState>((state) => state.posts);

export const selectAllPostsIds = createSelector(selectAllPosts, (posts) =>
    posts.map((post) => post.id)
);

export const selectPostStatus = (state: RootState) => state.posts.status;

export const postCaseReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(fetchPostsThunkAction.pending, (state, action) => {
            state.status = "loading";
        })
        .addCase(fetchPostsThunkAction.fulfilled, postAdapter.upsertMany)
        .addCase(fetchPostsThunkAction.rejected, (state, action) => {
            state.error = action.payload as string;
        });
});

/*

 .addCase(fetchPostsThunkAction.fulfilled, (state, action) => {
            // state.entities = action.payload;
            postAdapter.setAll(state, action.payload);
            state.status = "idle";
        })

*/

const postSliceReducer = createSlice({
    name: "posts",
    initialState: initialState,
    reducers: {
        addPostAction(state, action) {
            const post = action.payload;
            state.entities[post.id] = post;
        },
        postDeleteAction: postAdapter.removeOne
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPostsThunkAction.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPostsThunkAction.fulfilled, postAdapter.upsertMany)
            .addCase(fetchPostsThunkAction.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    }
    /*
        setPostColorAction: {
            reducer(state, action) {
                const {color, postId} = action.payload;
                state.entities[postId].color = color;
            },
            prepare(postId, color) {
               return {payload: {color, postId}};
            }
        },
        extraReducers: {
            [fetchPostsThunkAction.pending]: (state, action) => {
                state.status = "loading";
            },
            [fetchPostsThunkAction.fulfilled]: (state, action) => {
                postAdapter.setAll(state, action.payload);
                state.status = "idle";
            },
          
            [fetchPostsThunkAction.rejected]: (state, action) => {
                state.error = action.payload;
            }
        }
        */
});

export const {addPostAction, postDeleteAction} = postSliceReducer.actions;

export default postSliceReducer.reducer;
