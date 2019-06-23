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
import AddAssessmentSubmission from "./components/student/submission/AddAssessmentSubmission";
import EnrolledCourses from "./components/student/EnrolledCourses";
import EnrolledCourseAssessmentView from "./components/student/EnrolledCourseAssessmentView";
import ViewSystemCourses from "./components/student/ViewSystemCourses";
import ViewAssessmentSubmission from "./components/student/submission/ViewAssessmentSubmission";

function App() {
    return (
        <BrowserRouter>
            <NavBar/>
            <div className="container">
                <br/>
                <Switch>
                    <Route exact path="/" component={Login}/>
                    <Route path="/login" component={Login}/>

                    {
                        sessionStorage.getItem('userType') === 'student' ?
                            (
                                <div>
                                    <Route exact path="/home" component={Landing}/>
                                    <Route exact path="/courses" component={ViewSystemCourses}/>
                                    <Route exact path="/courses/:id" component={EnrolledCourseAssessmentView}/>
                                    <Route exact path="/assessments/:id" component={AddAssessmentSubmission}/>
                                    <Route exact path="/submissions/assessment/:id" component={ViewAssessmentSubmission}/>
                                    {/*<Route exact path="/assessments/:id/edit" component={EditAssessment}/>*/}
                                    {/*<Route exact path="/submissions/" component={ViewSubmissions}/>*/}
                                </div>
                            )
                            : sessionStorage.getItem('userType') === 'instructor' ?
                            (
                                <div>
                                    <Route exact path="/home" component={Landing}/>
                                    <Route exact path="/notifications" component={InstructorNotifications}/>
                                    <Route exact path="/courses" component={ViewAcceptedCourses}/>
                                    <Route exact path="/courses/:id" component={ViewCourseAssessments}/>
                                    <Route exact path="/assessments/:id" component={ViewAssessment}/>
                                    <Route exact path="/assessments/:id/edit" component={EditAssessment}/>
                                    <Route exact path="/submissions/" component={ViewSubmissions}/>
                                </div>
                            ) : sessionStorage.getItem('userType') === 'admin' ?
                                (
                                    <div>
                                        <Route exact path="/assessments/:id/edit" component={EditAssessment}/>
                                        <Route exact path="/submissions/" component={ViewSubmissions}/>
                                    </div>
                                ) :null
                    }
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
