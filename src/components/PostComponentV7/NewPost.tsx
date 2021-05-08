import IPost from "@domain/models/Post";
import {addPostAsyncThunk} from "@features/Posts/postSliceReducer";
import {useAppDispatch} from "@hooks/useAppDispatch";
import React, {useState} from "react";

type Props = {id: number};
export const NewPost: React.FC<Props> = ({id}) => {
    const dispatch = useAppDispatch();
    const [post, setPost] = useState<Omit<IPost, "id">>({
        userId: id,
        title: "",
        body: ""
    });
    const submitPost = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(addPostAsyncThunk(post));
        console.log("submitPost");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setPost({
            ...post,
            [name]: value
        });
        console.log(post);
        console.log("handleChangePost");
    };

    return (
        <form onSubmit={submitPost} noValidate>
            <label htmlFor="title-id">Title: </label>
            <input
                type="text"
                id="title-id"
                name="title"
                value={post.title}
                onChange={handleChange}
            />
            <label htmlFor="body-id">Body: </label>
            <input type="text" id="body-id" name="body" value={post.body} onChange={handleChange} />
            <input type="submit" value="Submit" />
        </form>
    );
};
