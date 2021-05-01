import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@storages/index";
import {selectPostStatus, initialState, selectPostById} from "@features/Posts/postSliceReducer";
import {useAppDispatch} from "@hooks/useAppDispatch";
import {useAppSelector} from "@hooks/useAppSelector";

export type Props = {id: number};
// scss and crud transactions
const PostItem: React.FC<Props> = ({id}) => {
    const Post = useAppSelector((state: RootState) => selectPostById(state, id));
    const statu = useAppSelector((state: RootState) => selectPostStatus(state));
    const [status, setStatus] = useState(statu);
    const dispatch: AppDispatch = useAppDispatch();
    if (Post === undefined) {
        return <div>Loading....</div>;
    } else {
        return (
            <li id="id">
                <div className="view">{Post.title}</div>
                <div className="view">{Post.body}</div>
            </li>
        );
    }
};

export default PostItem;
