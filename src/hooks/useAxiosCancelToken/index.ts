import React from "react";
import axios, {CancelTokenSource} from "axios";

export const useAxiosCancelToken = () => {
    const cancelToken = axios.CancelToken; //create cancel token
    /*
    const [cancelTokenSource, setCancelTokenSource]: [
        CancelTokenSource,
        (cancelTokenSource: CancelTokenSource) => void
    ] = React.useState(cancelToken.source());
    */
    const cancelTokenSource = cancelToken.source();
    return cancelTokenSource;
};
