import PostApiClass from "@services/PostService";

class PostControllerClass extends PostApiClass {
    public constructor(baseURL: string) {
        super(baseURL);
        console.log("baseUrl:" + baseURL);
    }
}

export default PostControllerClass;
