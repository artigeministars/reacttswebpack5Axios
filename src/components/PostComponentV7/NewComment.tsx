import IComment from "@domain/models/Comment";
import {addCommentAsyncThunk} from "@features/comments/commentsSliceReducer";
import React, {useState} from "react";
type Props = {id: number};
export const NewComment: React.FC<Props> = ({id}) => {
    const [uComment, setComment] = useState<Omit<IComment, "id">>({
        postId: id,
        name: "",
        email: "",
        body: ""
    });
    const submitComment = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("icerde");
        const response = addCommentAsyncThunk(uComment);
        console.log(response);
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("icerde");
        const name = e.target.name;
        const value = e.target.value;
        setComment({
            ...uComment,
            [name]: value
        });
    };

    return (
        <div>
            <form onSubmit={submitComment}>
                <label htmlFor="comment-name">Name: </label>
                <input
                    id="comment-name"
                    name="name"
                    value={uComment.name}
                    type="text"
                    onChange={handleChange}
                />
                <label htmlFor="comment-email">Email: </label>
                <input
                    id="comment-email"
                    name="email"
                    value={uComment.email}
                    type="text"
                    onChange={handleChange}
                />
                <label htmlFor="comment-body">Body: </label>
                <input
                    id="comment-body"
                    name="body"
                    value={uComment.body}
                    type="text"
                    onChange={handleChange}
                />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};
