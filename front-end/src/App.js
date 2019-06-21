import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import './assets/styles/App.css';
import ViewSubmissions from "./components/instructor/assessment-submission/ViewSubmissions";
import ViewCourseAssessments from "./components/instructor/assessment/ViewCourseAssessments";
import ViewAssessment from "./components/instructor/assessment/ViewAssessment";
import EditAssessment from "./components/instructor/assessment/EditAssessment";
import NavBar from "./components/layout/NavBar";
import CoursesHome from "./components/layout/CoursesHome";
import Login from "./components/layout/Login";
import Register from "./components/layout/Register";
import InstructorNotifications from "./components/layout/InstructorNotifications";

function App() {
    return (
        <BrowserRouter>
            <NavBar/>
            <div className="container">
                <br/>
                <Switch>
                    <Route exact path="/" component={InstructorNotifications}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Route exact path="/courses" component={CoursesHome}/>
                    <Route exact path="/courses/:id" component={ViewCourseAssessments}/>
                    <Route exact path="/assessments/:id" component={ViewAssessment}/>
                    <Route exact path="/assessments/:id/edit" component={EditAssessment}/>
                    <Route exact path="/submissions/" component={ViewSubmissions}/>

                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
