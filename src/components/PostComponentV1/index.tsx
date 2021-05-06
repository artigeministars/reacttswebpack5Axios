import React from "react";
import axios, {CancelTokenSource} from "axios";
import IPost from "@domain/models/Post";
import "./postComponent.css";

const defaultPosts: IPost[] = [];

const PostC1: React.FC = () => {
    const [posts, setPosts]: [IPost[], (posts: IPost[]) => void] = React.useState<IPost[]>(
        defaultPosts
    );
    const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(
        true
    );

    const [error, setError]: [string, (error: string) => void] = React.useState("");

    const cancelToken = axios.CancelToken;
    const [cancelTokenSource, setCancelTokenSource]: [
        CancelTokenSource,
        (CancelTokenSource: CancelTokenSource) => void
    ] = React.useState(cancelToken.source());

    const handleCancelClick = () => {
        if (cancelTokenSource) {
            cancelTokenSource.cancel("User Canceled Operation!");
        }
    };

    const ax = () => {
        axios
            .get<IPost[]>("https://jsonplaceholder.typicode.com/posts", {
                cancelToken: cancelTokenSource.token,
                headers: {
                    "Content-Type": "application/json"
                },
                timeout: 5000
            })
            .then((response) => {
                setPosts(response.data);
                setLoading(false);
            })
            .catch((ex) => {
                const err = axios.isCancel(ex)
                    ? "Request cancelled"
                    : ex.code === "ECONNABORTED"
                    ? "A timeout has occurred"
                    : ex.response.status === 404
                    ? "Resource not found"
                    : "An unexpected error has occurred";
                setError(err);
                setLoading(false);
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

export default PostC1;
