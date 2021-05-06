import React, {useEffect, useState} from "react";
import {useAppSelector} from "@hooks/useAppSelector";
import PostItem from "./PostItem";
import {selectAllPosts} from "@features/Posts/postSliceReducer";
import "./postComponent.css";

const PostC7: React.FC = () => {
    const todoIds = useAppSelector(selectAllPosts);
    console.log(todoIds);
    // return <div></div>;

    const renderedListItems = todoIds.map((todoId) => {
        return <PostItem key={todoId.id} id={todoId.id} />;
    });
    return <ul className="post-list">{renderedListItems}</ul>;
};

export default PostC7;
