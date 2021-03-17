import axios from "axios";
import {AxiosResponse} from "axios";
// use this config for general purposes
import {configBase} from "./configsAxios";
//use every model API.ts and write crud actipns each
const baseUrl = "http://localhost:4000";

export const axiostodosAPI = async (): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const todos: AxiosResponse<ApiDataType> = await axios.get(baseUrl + "/todos");
        return todos;
    } catch (error) {
        throw new Error(error);
    } finally {
        console.log("reached finally");
    }
};

export const sendGetRequestAPI = async () => {
    try {
        const resp = await axios.get("https://jsonplaceholder.typicode.com/posts");
        console.log(resp.data);
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};

export const sendRequestAPI2 = async () => {
    try {
        const resp = await axios({
            method: "PUT",
            url: "https://jsonplaceholder.typicode.com/posts/1",
            data: {
                id: 1,
                userId: 1,
                title: "A new title",
                body: "Update this post"
            }
        });

        console.log(resp.data);
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};

export const sendGetRequestAPI3 = async () => {
    try {
        const resp = await axios.get("https://jsonplaceholder.typicode.com/posts", {
            headers: {
                authorization: "Bearer YOUR_JWT_TOKEN_HERE"
            }
        });

        console.log(resp.data);
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};
// good prototype example
export async function get<T>(path: string): Promise<T> {
    const {data} = await axios.get(path);
    return data;
}
// use below for above function
/*
export const useGetDailyPrices = () => {
    const [data, setData] = useState<DailyPrice[]>([]);

    const getData = async () => {
        const { results } = await get<APIResponse>('./data/DUMMY_DATA.json');
        setData(results)
    }

    useEffect(() => {
        getData()
    }, [])

    return data;
}
*/
// how to use catch block
/*

.catch(ex => {
  const error =
      ex.code === "ECONNABORTED"
      ? "A timeout has occurred"
      : ex.response.status === 404
        ? "Resource not found"
        : "An unexpected error has occurred";
     setError(err);
     setLoading(false);
});

*/
/* for canceltoken 
https://medium.com/swlh/interacting-with-restful-apis-using-typescript-react-hooks-and-axios-part-1-af52920ae3e4
*/
