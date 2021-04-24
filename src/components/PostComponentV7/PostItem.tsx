import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectPostById} from "@features/Posts/selectors";
import {AppDispatch} from "@storages/index";
import {PostState} from "@features/Posts/postSliceReducer";

export type Props = {id: number};

const PostItem: React.FC<Props> = ({id}) => {
    const Post = useSelector((state: PostState) => selectPostById(state, id));
    const dispatch: AppDispatch = useDispatch();
    return (
        <li id="id">
            <div className="view">{Post.title}</div>
            <div className="view">{Post.body}</div>
        </li>
    );
};

export default PostItem;
