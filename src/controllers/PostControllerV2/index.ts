import PostApiClass from "@services/PostService";

class PostControllerClass extends PostApiClass {
    public constructor(baseURL: string) {
        super(baseURL);
        console.log("baseUrl:" + baseURL);
    }
}

export const getPostsStatic = async () => {
    try {
        const response = await PostApiClass.getPostsStatic();
        /*
        response.data
        response.status
        response.statusText
        response.config
        response.headers
        response.request
        */
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const deletePostStatic = async (id: string) => {
    try {
        const response = await PostApiClass.deletePostStatic(id);
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export default PostControllerClass;
