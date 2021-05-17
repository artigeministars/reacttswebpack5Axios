import React, {useEffect} from "react";
import {HashRouter as Router, Switch, Route, Link, useLocation} from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import Topics from "./Topics";

export const RouteEx = () => {
    return (
        <div>
            <Router>
                <ScrollToTop />
                <nav>
                    <ul>
                        <li>
                            <Link to="/About">About</Link>
                        </li>
                        <li>
                            <Link to="/Home">Home</Link>
                        </li>
                        <li>
                            <Link to="/Users">Users</Link>
                        </li>
                        <li>
                            <Link to="/Topics">Topics</Link>
                        </li>
                    </ul>
                </nav>

                <Switch>
                    <Route path="/About">
                        <About />
                    </Route>
                    <Route path="/Home">
                        <Home />
                    </Route>
                    <Route path="/Users">
                        <Users />
                    </Route>
                    <Route exact path="/Topics">
                        <Topics />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};

export const Home: React.FC = () => {
    return <h2>Home</h2>;
};

export const About: React.FC = () => {
    return <h2>About</h2>;
};

export const Users: React.FC = () => {
    return <h2>Users</h2>;
};

export default RouteEx;
