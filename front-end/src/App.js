import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import './assets/css/App.css';
import ViewSubmissions from "./components/instructor/assessment-submission/ViewSubmissions";
import ViewCourseAssessments from "./components/instructor/assessment/ViewCourseAssessments";
import ViewAssessment from "./components/instructor/assessment/ViewAssessment";
import EditAssessment from "./components/instructor/assessment/EditAssessment";
import NavBar from "./components/layout/NavBar";
import ViewAcceptedCourses from "./components/layout/instructor/ViewAcceptedCourses";
import Login from "./components/layout/Login";
import InstructorNotifications from "./components/layout/InstructorNotifications";
import Landing from "./components/layout/instructor/home/Landing";
import AssessmentSubmission from "./components/student/AssessmentSubmission";
import EnrolledCourses from "./components/student/EnrolledCourses";
import EnrolledCourseAssessmentView from "./components/student/EnrolledCourseAssessmentView";
import ViewSystemCourses from "./components/student/ViewSystemCourses";

function App() {
    return (
        <BrowserRouter>
            <NavBar/>
            <div className="container">
                <br/>
                <Switch>
                    <Route exact path="/" component={Landing}/>
                    <Route path="/login" component={Login}/>

                    <Route exact path="/courses" component={ViewSystemCourses}/>

                    <Route exact path="students/courses" component={EnrolledCourses}/>
                    <Route exact path="students/courses/:id" component={EnrolledCourseAssessmentView}/>
                    <Route exact path="students/submission/:id" component={AssessmentSubmission}/>


                    <Route exact path="/instructors/home" component={Landing}/>
                    <Route exact path="/instructors/:id/notifications" component={InstructorNotifications}/>
                    <Route exact path="/instructors/:id/courses" component={ViewAcceptedCourses}/>


                    {/*<Route exact path="/courses/:id" component={ViewCourseAssessments}/>*/}
                    <Route exact path="/assessments/:id" component={ViewAssessment}/>
                    <Route exact path="/assessments/:id/edit" component={EditAssessment}/>
                    <Route exact path="/submissions/" component={ViewSubmissions}/>

                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
