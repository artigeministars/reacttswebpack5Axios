import React, {useEffect, useState} from "react";
import IPost from "@domain/models/Post";
// import {useAxiosCancelToken} from "@hooks/useAxiosCancelToken";
import {cancelTokenSource} from "@config/axios/General";
import PostControllerClass from "@controllers/PostControllerV3";
import axios from "axios";
import {POST_CONSTANTS} from "@constants/PostConstants";
import "@components/PostComponentV1/postComponent.scss";

const defaultPosts: IPost[] = [];
const postController = new PostControllerClass(POST_CONSTANTS.POSTBASEURL);

const PostC3: React.FC = () => {
    const [posts, setPosts]: [IPost[], (posts: IPost[]) => void] = useState<IPost[]>(defaultPosts);
    const [loading, setLoading]: [boolean, (loading: boolean) => void] = useState<boolean>(true);
    const [error, setError]: [string, (error: string) => void] = useState("");
    // const cancelTokenSource = useAxiosCancelToken();

    const handleCancelClick = () => {
        if (cancelTokenSource) {
            cancelTokenSource.cancel("User Canceled Operation!");
        }
    };

    const ax = async () => {
        try {
            const postResponse = await postController.getPosts();
            setPosts(postResponse.data);
            setLoading(false);

            console.log("--- response data ---");
            console.log(postResponse.data);
            console.log("--- response status ---");
            console.log(postResponse.status);
            console.log("--- response statusText ---");
            console.log(postResponse.statusText);
            console.log("--- request config ---");
            console.log(postResponse.config);
            console.log("--- request ---");
            console.log(postResponse.request);
            console.log("--- request headers ---");
            console.log(postResponse.headers);
        } catch (error) {
            const err = axios.isCancel(error)
                ? "Request cancelled"
                : error.code === "ECONNABORTED"
                ? "A timeout has occurred"
                : error.status === 404
                ? "Resource not found"
                : "An unexpected error has occurred";
            setError(err);
            setLoading(false);

            console.log(error);
        }
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

export default PostC3;
