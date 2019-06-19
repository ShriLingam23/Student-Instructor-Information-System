import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import './assets/styles/App.css';
import ViewSubmissions from "./components/instructor/assessment-submission/ViewSubmissions";
import ViewCourse from "./components/instructor/assessment/ViewCourse";
import ViewAssessment from "./components/instructor/assessment/ViewAssessment";
import EditAssessment from "./components/instructor/assessment/EditAssessment";
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
                    <Route exact path="/submissions/" component={ViewSubmissions}/>

                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
