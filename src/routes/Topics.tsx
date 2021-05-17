import React from "react";
import {
    BrowserRouter as Router,
    NavLink,
    Route,
    Switch,
    useParams,
    useRouteMatch
} from "react-router-dom";

export const Topics: React.FC = () => {
    const {url, path} = useRouteMatch();
    return (
        <div>
            <h2>Topics</h2>
            <ul>
                <li>
                    <NavLink to={`${url}/components`} activeClassName="hurray">
                        Components
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`${url}/props-v-state`}>Props v. State</NavLink>
                </li>
            </ul>
            {
                <Switch>
                    <Route exact path={path}>
                        <h3>Please select a topic.</h3>
                    </Route>
                    <Route path={`${path}/:topicId`}>
                        <Topic />
                    </Route>
                </Switch>
            }
        </div>
    );
};

export const Topic: React.FC = () => {
    const {topicId}: {topicId: string} = useParams();
    return <h3>Requested topic ID: {topicId}</h3>;
};

export default Topics;
