import IComment from "@domain/models/Comment";
import {
    createAsyncThunk,
    createEntityAdapter,
    createReducer,
    createSelector,
    createSlice,
    PayloadAction
} from "@reduxjs/toolkit";
import {getCommentsAsync} from "@services/CommentServiceC";
import {RootState} from "@storages/index";

type Comment = IComment;

export const commentAdapter = createEntityAdapter<Comment>({
    selectId: (comment) => comment.id,
    sortComparer: (a, b) => a.name.localeCompare(b.name)
});

export const initialComment = commentAdapter.getInitialState({
    status: "idle",
    error: ""
});

export const fetchCommentAsyncThunk = createAsyncThunk(
    "@@Comment/getComments",
    async (postId: number) => {
        try {
            return (await getCommentsAsync(postId)).data;
        } catch (error) {
            return error;
        }
    }
);

export const {
    selectAll: selectAllComments,
    selectById: selectCommentById
} = commentAdapter.getSelectors<RootState>((state) => state.comments);

export const selectAllCommentsIds = createSelector(selectAllComments, (comments) =>
    comments.map((comment) => comment.id)
);

const commentSliceReducer = createSlice({
    name: "comments",
    initialState: initialComment,
    reducers: {
        postDeleteAction: commentAdapter.removeOne
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommentAsyncThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCommentAsyncThunk.fulfilled, (state, action) => {
                commentAdapter.setAll(state, action.payload);
                state.status = "idle";
            })
            .addCase(fetchCommentAsyncThunk.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    }
});

export default commentSliceReducer.reducer;
