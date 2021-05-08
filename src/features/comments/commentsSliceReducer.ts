import IComment from "@domain/models/Comment";
import {
    createAsyncThunk,
    createEntityAdapter,
    createReducer,
    createSelector,
    createSlice,
    PayloadAction
} from "@reduxjs/toolkit";
import {addCommentAsync, getCommentsAsync} from "@services/CommentServiceC";
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

export const addCommentAsyncThunk = createAsyncThunk(
    "@@Comment/addComment",
    async (comment: Omit<IComment, "id">) => {
        try {
            if ((await addCommentAsync(comment)).status === 200) {
                fetchCommentAsyncThunk(comment.postId);
            }
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
        commentDeleteAction: commentAdapter.removeOne,
        commentAddAction: commentAdapter.addOne,
        commentUpdateAction: commentAdapter.updateOne
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommentAsyncThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCommentAsyncThunk.fulfilled, (state, action) => {
                commentAdapter.upsertMany(state, action.payload);
                state.status = "idle";
            })
            .addCase(fetchCommentAsyncThunk.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(addCommentAsyncThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addCommentAsyncThunk.fulfilled, (state, action) => {
                commentAdapter.addOne(state, action.payload);
                state.status = "idle";
            })
            .addCase(addCommentAsyncThunk.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    }
});

export const {
    commentDeleteAction,
    commentAddAction,
    commentUpdateAction
} = commentSliceReducer.actions;

export default commentSliceReducer.reducer;
