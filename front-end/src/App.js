import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import './assets/styles/App.css';
import NavBar from "./components/content/NavBar";
import CourseView from "./components/instructor/CourseView";
import AssignmentView from "./components/instructor/AssignmentView";
import EditAssignment from "./components/instructor/EditAssignment";

function App() {
    return (
        <BrowserRouter>
            <NavBar/>
            <div className="container">
                <Switch>
                    <Route exact path="/" component={CourseView}/>
                    <Route path="/assignment-view/:id" component={AssignmentView}/>
                    <Route path="/edit/:id" component={EditAssignment}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
