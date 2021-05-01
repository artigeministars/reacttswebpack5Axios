import React from "react";
import ReactDOM, {render} from "react-dom";
import {Provider} from "react-redux";
import "./index.css";
import App from "./App";
import {fetchPostsThunkAction} from "@features/Posts/postSliceReducer";
import {store} from "./store";

store.dispatch(fetchPostsThunkAction());
/*
ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
*/

const renderApp = () =>
    render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById("root")
    );

if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept("./App", renderApp);
}

renderApp();
