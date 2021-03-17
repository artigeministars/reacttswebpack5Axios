import React, {useEffect, useState} from "react";
import IPost from "@domain/models/Post";
import {cancelTokenSource, setCancelTokenSource} from "@config/axios/General";
import PostControllerClass from "@controllers/PostControllerV2";
import axios from "axios";
import {POST_CONSTANTS} from "@constants/PostConstants";
import "@components/PostComponentV1/postComponent.scss";

const defaultPosts: IPost[] = [];
const postController = new PostControllerClass(POST_CONSTANTS.POSTBASEURL);
const postedData: IPost = {
    userId: 1,
    title: "A new post from gemini",
    body: "This is the body of the new post"
};

const updatedPost = {
    id: 1,
    userId: 1,
    title: "A new title from gemini",
    body: "Update this post"
};

const PostC2: React.FC = () => {
    const [posts, setPosts]: [IPost[], (posts: IPost[]) => void] = useState<IPost[]>(defaultPosts);
    const [loading, setLoading]: [boolean, (loading: boolean) => void] = useState<boolean>(true);
    const [error, setError]: [string, (error: string) => void] = useState("");

    const handleCancelClick = () => {
        if (cancelTokenSource) {
            cancelTokenSource.cancel("User Canceled Operation!");
        }
        setCancelTokenSource(cancelTokenSource);
    };

    const ax = () => {
        Promise.resolve(postController.addPost(postedData))
            .then((response) => {
                console.log(response.status);
                if (response.status === 201) {
                    console.log(response.statusText);
                }
            })
            .catch((error) => {
                console.log(error);
            });

        Promise.resolve(postController.updatePost(updatedPost))
            .then((response) => {
                console.log(response.status);
                if (response.status === 201) {
                    console.log(response.statusText);
                }
            })
            .catch((error) => {
                console.log(error);
            });

        Promise.resolve(postController.deletePost("1"))
            .then((response) => {
                console.log(response.status);
            })
            .catch((error) => {
                console.log(error);
            });

        Promise.resolve(postController.getPosts())
            .then((response) => {
                setPosts(response.data);
                setLoading(false);
            })
            .catch((response) => {
                const err = axios.isCancel(response)
                    ? "Request cancelled"
                    : response.code === "ECONNABORTED"
                    ? "A timeout has occurred"
                    : response.status === 404
                    ? "Resource not found"
                    : "An unexpected error has occurred";
                setError(err);
                // setError(response.data);
                setLoading(false);
                Promise.reject(err);
                throw new Error("error oldu");
                // throw err;
            });
    };
    React.useEffect(() => {
        setTimeout(ax, 10000);
    });

    return (
        <div className="App">
            {loading && <button onClick={handleCancelClick}>Cancel</button>}
            <ul className="posts">
                {posts.map((post) => (
                    <li key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default PostC2;
