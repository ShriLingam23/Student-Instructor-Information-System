import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import './assets/styles/App.css';
import NavBar from "./components/content/NavBar";
import ViewCourse from "./components/instructor/ViewCourse";
import ViewAssignment from "./components/instructor/ViewAssignment";
import EditAssignment from "./components/instructor/EditAssignment";
import Home from "./components/content/Home";

function App() {
    return (
        <BrowserRouter>
            <NavBar/>
            <div className="container">
                <Switch>
                    <Route exact path="/courses" component={Home}/>
                    <Route exact path="/courses/:id" component={ViewCourse}/>
                    <Route exact path="/assignments/:id" component={ViewAssignment}/>
                    <Route exact path="/assignments/:id/edit" component={EditAssignment}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
