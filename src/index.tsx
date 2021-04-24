import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import "./index.css";
import App from "./App";
import {store} from "@storages/index";
import {getPostsThunkAction, getPostsThunkActionSol} from "@features/Posts/actions";

store.dispatch<any>(getPostsThunkAction());

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
