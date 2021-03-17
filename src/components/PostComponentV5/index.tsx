import React, {useEffect, useState} from "react";
import {POST_CRUD} from "@constants/PostConstants";
import {generalAxiosConfig} from "@config/axios/General";
import {useFetch} from "@hooks/useFetchAxios";
import "@components/PostComponentV1/postComponent.scss";
import {AxiosRequestConfig} from "axios";

const PostC5: React.FC = () => {
    const {response, loading, error} = useFetch(
        true,
        POST_CRUD.getPosts as string,
        generalAxiosConfig as AxiosRequestConfig
    );

    return (
        <div className="App">
            <ul className="posts">
                {response.length > 0 &&
                    response.map((post) => (
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

export default PostC5;
