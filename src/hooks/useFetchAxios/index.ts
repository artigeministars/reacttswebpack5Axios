import IPost from "@domain/models/Post";
import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {useEffect, useState} from "react";
import "axios-progress-bar/dist/nprogress.css";
//  useFetch hook below.
//  const { response, loading } = useFetch(doSearch, "test.json");

export interface IUseFetch {
    response: IPost[];
    loading: boolean;
    error: boolean;
}

export const useFetch = (trigger: boolean, url: string, config: AxiosRequestConfig): IUseFetch => {
    const [response, setResponse] = useState<IPost[]>(<IPost[]>[]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        let mounted = true;
        const abortController = new AbortController();
        const signal = abortController.signal;

        if (trigger && mounted) {
            const fetchData = async () => {
                try {
                    const response = await axios.get<IPost[]>(url, config);
                    if (response.status === 200 && !signal.aborted) {
                        setResponse(response.data);
                    }
                    setLoading(false);
                } catch (err) {
                    if (!signal.aborted) {
                        const error =
                            err.code === "ECONNABORTED"
                                ? "A timeout has occurred"
                                : err.response.status === 404
                                ? "Resource not found"
                                : "An unexpected error has occurred";
                        setResponse(err);
                        setError(true);
                    }
                } finally {
                    if (!signal.aborted) {
                        setLoading(false);
                    }
                }
            };
            fetchData();
        }

        return () => {
            mounted = false;
            abortController.abort();
        };
    }, [trigger, url, config]);

    return {response, loading, error};
};
