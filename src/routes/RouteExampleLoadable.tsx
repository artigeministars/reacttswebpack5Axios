import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import React, {Suspense} from "react";
import loadable, {lazy} from "@loadable/component";

// full dynamic import
// const Comps = loadable((props: {page: string}) => import(`./${props.page}`));
// <Comps page="Home" />

const Home = loadable(() => import(/* webpackChunkName: 'Home' */ "./Home"), {
    fallback: <div>Loading...</div>
});
const About = loadable(() => import(/* webpackChunkName: 'About' */ "./About"), {
    fallback: <div>Loading...</div>
});
const Topics = loadable(() => import(/* webpackChunkName: 'Topics' */ "./Topics"));
// const Topics = /* #__LOADABLE__ */ () => import(/* webpackChunkName: 'Topics' */ "./Topics");

export const RouterExampleLoadable: React.FC = () => {
    return (
        <Router>
            <nav>
                <ul>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/users">Users</Link>
                    </li>
                    <li>
                        <Link to="/topics">Topics</Link>
                    </li>
                </ul>
            </nav>
            <Switch>
                <Route path="/home">
                    <Home />
                </Route>
                <Route path="/about">
                    <About />
                </Route>
                <Route path="/users">
                    <Users />
                </Route>
                <Route path="/topics">
                    <Topics fallback={<div>Loading...</div>} />
                </Route>
            </Switch>
        </Router>
    );
};

export const Users: React.FC = () => {
    return <h2>Users</h2>;
};

export default RouterExampleLoadable;
