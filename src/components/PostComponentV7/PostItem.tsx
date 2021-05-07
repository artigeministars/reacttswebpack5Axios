import React, {useCallback, useEffect, useState} from "react";
import {AppDispatch, RootState} from "@storages/index";
import {
    selectPostStatus,
    initialState,
    selectPostById,
    fetchPostsThunkAction,
    statuOfPosts
} from "@features/Posts/postSliceReducer";
import {useAppDispatch} from "@hooks/useAppDispatch";
import {useAppSelector} from "@hooks/useAppSelector";
import {fetchCommentAsyncThunk, selectAllComments} from "@features/comments/commentsSliceReducer";
import IComment from "@domain/models/Comment";
import CommentItem from "./CommentItem";
import "./postComponent.scss";

export type Props = {id: number};
// scss and crud transactions
const PostItem: React.FC<Props> = ({id}) => {
    const dispatch: AppDispatch = useAppDispatch();

    const Post = useAppSelector((state: RootState) => selectPostById(state, id));
    const statu = useAppSelector((state: RootState) => statuOfPosts(state));
    const [status, setStatus] = useState(statu);
    const comments = useAppSelector(selectAllComments);
    console.log("comments here:");
    console.log(comments);

    const filteredCommentsFunc = (comments: IComment[], postId: number) =>
        comments.filter((comment) => comment.postId === postId);
    const filteredComments = filteredCommentsFunc(comments, id);

    const commentLists = filteredComments.map((f: IComment) => {
        return <CommentItem key={f.id} id={f.id} />;
    });
    useEffect(() => {
        dispatch(fetchCommentAsyncThunk(id));
    }, [dispatch, id]);

    /*
 useEffect(() => {
        dispatch(fetchCommentAsyncThunk(id));
    }, [dispatch, id]);

    const commentLists = (filteredCommentsList: IComment[]) => {
       const commentList = filteredCommentsList.map((f: IComment) => {
            return <CommentItem key={f.id} id={f.postId} />;
        });
    };

    const commentLists = useCallback(() => {
        (filteredComments: IComment[]) => {
            filteredComments.map((f: IComment) => {
                return <CommentItem key={f.postId} id={f.postId} />;
            });
        };
    }, [filteredComments]);
*/
    if (Post === undefined) {
        return <div>Loading....</div>;
    } else {
        return (
            <li id="id" className="post-list-item">
                <div className="post-list-sub-item">{Post.title}</div>
                <div className="post-list-sub-item">{Post.body}</div>
                <div>statu: {status}</div>

                {commentLists !== undefined && <ul className="post-sub-list">{commentLists}</ul>}
            </li>
        );
    }
};

export default PostItem;
