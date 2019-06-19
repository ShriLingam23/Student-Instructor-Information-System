import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import './assets/styles/App.css';
import ViewCourse from "./components/instructor/ViewCourse";
import ViewAssessment from "./components/instructor/ViewAssessment";
import EditAssessment from "./components/instructor/EditAssessment";
import NavBar from "./components/layout/NavBar";
import Home from "./components/layout/Home";

function App() {
    return (
        <BrowserRouter>
            <NavBar/>
            <div className="container">
                <Switch>
                    <Route exact path="/courses" component={Home}/>
                    <Route exact path="/courses/:id" component={ViewCourse}/>
                    <Route exact path="/assessments/:id" component={ViewAssessment}/>
                    <Route exact path="/assessments/:id/edit" component={EditAssessment}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
