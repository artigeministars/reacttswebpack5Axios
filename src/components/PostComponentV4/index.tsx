import React, {useEffect, useState} from "react";
import IPost from "@domain/models/Post";
// import {useAxiosCancelToken} from "@hooks/useAxiosCancelToken";
import {cancelTokenSource, setCancelTokenSource} from "@config/axios/General";
import {AxiosResponse} from "axios";
import {POST_CONSTANTS} from "@constants/PostConstants";
import {getPostsStatic, deletePostStatic} from "@controllers/PostControllerV4";

import "@components/PostComponentV1/postComponent.scss";

const defaultPosts: IPost[] = [];

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

    React.useEffect(() => {
        const res: Promise<AxiosResponse<IPost[]>> = getPostsStatic();
        console.log("response:::");
        console.dir(res);
        const deletedRes: Promise<AxiosResponse<IPost>> = deletePostStatic("1");
        console.log("deleted response:::");
        console.dir(deletedRes);
    }, [posts.length]);

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
