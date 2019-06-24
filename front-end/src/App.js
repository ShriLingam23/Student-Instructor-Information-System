import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import './assets/css/App.css';
import ViewSubmissions from "./components/instructor/assessment-submission/ViewSubmissions";
import ViewCourseAssessments from "./components/instructor/assessment/ViewCourseAssessments";
import ViewAssessment from "./components/instructor/assessment/ViewAssessment";
import EditAssessment from "./components/instructor/assessment/EditAssessment";
import NavBar from "./components/user/NavBar";
import ViewAcceptedCourses from "./components/instructor/course/ViewAcceptedCourses";
import Login from "./components/user/Login";
import InstructorNotifications from "./components/instructor/course/InstructorNotifications";
import Landing from "./components/instructor/home/Landing";
import AddAssessmentSubmission from "./components/student/submission/AddAssessmentSubmission";
import EnrolledCourseAssessmentView from "./components/student/course/EnrolledCourseAssessmentView";
import ViewSystemCourses from "./components/student/course/ViewSystemCourses";
import ViewAssessmentSubmission from "./components/student/submission/ViewAssessmentSubmission";
import AdminLanding from "./components/admin/AdminLanding";
import Staff_Register from "./components/admin/Staff/Staff_Register";
import Staff_View from "./components/admin/Staff/Staff_View";
import Staff_Edit from "./components/admin/Staff/Staff_Edit";
import Course_Register from "./components/admin/Course/Course_Register";
import Course_View from "./components/admin/Course/Course_View";
import Course_Edit from "./components/admin/Course/Course_Edit";
import Student_View from "./components/admin/Student_Admin/Student_View";
import Student_Profile from "./components/admin/Student_Admin/Student_Profile";
import './assets/css/Admin.css'
import StudentLanding from "./components/student/home/StudentLanding";
import Register from "./components/user/Register";
import ForgotPassword from "./components/user/ForgotPassword";

function App() {
    return (
        <BrowserRouter>
            <NavBar/>
            <div>
                <div className="container">
                    <Route exact path="/" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/forgot-password" component={ForgotPassword}/>
                </div>
            </div>
            {
                sessionStorage.getItem('userType') === 'student' ?
                    (
                        <div className="parallax2">
                            <div className="container">
                                <Switch>
                                    <Route exact path="/home" component={StudentLanding}/>
                                    <Route exact path="/courses" component={ViewSystemCourses}/>
                                    <Route exact path="/courses/:id" component={EnrolledCourseAssessmentView}/>
                                    <Route exact path="/assessments/:id" component={AddAssessmentSubmission}/>
                                    <Route exact path="/submissions/assessment/:id" component={ViewAssessmentSubmission}/>
                                </Switch>
                            </div>
                        </div>
                    )
                    : sessionStorage.getItem('userType') === 'instructor' ?
                    (
                        <div className="parallax2">
                            <div className="container">
                                <Switch>
                                    <Route exact path="/home" component={Landing}/>
                                    <Route exact path="/notifications" component={InstructorNotifications}/>
                                    <Route exact path="/courses" component={ViewAcceptedCourses}/>
                                    <Route exact path="/courses/:id" component={ViewCourseAssessments}/>
                                    <Route exact path="/assessments/:id" component={ViewAssessment}/>
                                    <Route exact path="/assessments/:id/edit" component={EditAssessment}/>
                                    <Route exact path="/submissions/" component={ViewSubmissions}/>
                                </Switch>
                            </div>
                        </div>
                    ) : sessionStorage.getItem('userType') === 'admin' ?
                        (
                            <div className="parallax">
                                <div className="container">
                                    <Switch>
                                        <Route exact path='/home' component={AdminLanding}/>
                                        <Route exact path='/staff/add' component={Staff_Register}/>
                                        <Route exact path='/staff/view' component={Staff_View}/>
                                        <Route exact path='/staff/edit/:id' component={Staff_Edit}/>
                                        <Route exact path='/course/add' component={Course_Register}/>
                                        <Route exact path='/course/view' component={Course_View}/>
                                        <Route exact path='/course/edit/:id' component={Course_Edit}/>
                                        <Route exact path='/student/view/' component={Student_View}/>
                                        <Route exact path='/student/edit/:id' component={Student_Profile}/>
                                    </Switch>
                                </div>
                            </div>
                        ) : null
            }

        </BrowserRouter>
    );
}

export default App;
