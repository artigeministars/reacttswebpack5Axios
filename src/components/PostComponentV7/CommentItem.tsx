import {
    addCommentAsyncThunk,
    commentDeleteAction,
    selectCommentById
} from "@features/comments/commentsSliceReducer";
import {useAppSelector} from "@hooks/useAppSelector";
import {RootState} from "@storages/index";
import React, {useCallback} from "react";
import del from "@assets/icons/16914954041618134434-16.png";
import add from "@assets/icons/12735427001557740369-16.png";
import update from "@assets/icons/15861719021556282334-20.png";
import "./postComponent.scss";
import IComment from "@domain/models/Comment";
import {NewComment} from "./NewComment";

type props = {id: number};

const CommentItem: React.FC<props> = ({id}) => {
    const comment = useAppSelector((state: RootState) => selectCommentById(state, id));
    const deleteComment = useCallback((id: number) => {
        commentDeleteAction(id);
    }, []);

    const deleteCommentC = (id: number) => commentDeleteAction(id);

    const updateComment = useCallback((comment: IComment) => {
        addCommentAsyncThunk(comment);
    }, []);

    /*
    const addComment = useCallback((comment: IComment) => {
        addUpdateAction(comment);
    }, []);
     */
    console.log("comments");
    console.info(comment);
    if (comment === undefined) {
        return <div>Loading....</div>;
    } else {
        return (
            <li key="id" id="id" className="post-list-item">
                <div className="post-list-sub-item">{comment.name}</div>
                <div className="post-list-sub-item">{comment.email}</div>
                <div className="post-list-sub-item">{comment.body}</div>
                <div className="breakpoint">
                    <button onClick={() => deleteCommentC(comment.id)}>
                        <img className="crud-icons" src={del} alt="delete" />
                    </button>
                    <button onClick={() => updateComment(comment)}>
                        <img className="crud-icons" src={add} alt="add" />
                    </button>
                    <NewComment id={comment.postId as number}>
                        <img className="crud-icons" src={update} alt="update" />
                    </NewComment>
                </div>
            </li>
        );
    }
};

export default CommentItem;
function addUpdateAction(comment: IComment) {
    throw new Error("Function not implemented.");
}
