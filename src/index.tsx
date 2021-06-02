import React from "react";
import ReactDOM, {render} from "react-dom";
import {Provider} from "react-redux";
import "./index.scss";
import App from "./App";

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
        //   <Provider store={store}>
        <App />,
        //   </Provider>,
        document.getElementById("root")
    );

if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept("./App", renderApp);
}

renderApp();
