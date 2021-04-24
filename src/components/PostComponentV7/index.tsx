import React, {useEffect, useState} from "react";
import "@components/PostComponentV7/postComponent.module.scss";
import {selectPostsIds} from "@features/Posts/selectors";
import {useAppSelector} from "@hooks/useAppSelector";
import {PostState} from "@features/Posts/postSliceReducer";
import PostItem from "./PostItem";

const PostC7: React.FC = () => {
    const todoIds = useAppSelector(selectPostsIds);
    const loadingStatus = useAppSelector((state: PostState) => state.completed);

    if (loadingStatus === "loading") {
        return (
            <div className="todo-list">
                <div className="loader" />
            </div>
        );
    }
    if (todoIds !== undefined) {
        const renderedListItems = todoIds.map((todoId) => {
            return <PostItem key={todoId} id={todoId} />;
        });
        return <ul className="post-list">{renderedListItems}</ul>;
    } else {
        return <ul>Loading....</ul>;
    }
};

export default PostC7;
