import React from "react";
import logo from "./logo.svg";
// import jpegg from "./ge.jpeg";
// import pngg from "./gth.png";
import PostComponentC1 from "@components/PostComponentV1";
import PostComponentC2 from "@components/PostComponentV2";
import PostComponentC3 from "@components/PostComponentV3";
import PostComponentC4 from "@components/PostComponentV4";
import PostComponentC5 from "@components/PostComponentV5";

import "./App.css";
import "./App.scss";

function App() {
    console.log(process.env.MAINTAINER);
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
            <PostComponentC5></PostComponentC5>
        </div>
    );
}

export default App;
