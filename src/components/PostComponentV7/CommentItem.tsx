import {selectCommentById} from "@features/comments/commentsSliceReducer";
import {useAppSelector} from "@hooks/useAppSelector";
import {RootState} from "@storages/index";
import React from "react";
import "./postComponent.scss";

type props = {id: number};

const CommentItem: React.FC<props> = ({id}) => {
    const comment = useAppSelector((state: RootState) => selectCommentById(state, id));
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
                <div>statu: boş comment</div>
            </li>
        );
    }
};

export default CommentItem;
