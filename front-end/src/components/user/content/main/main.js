import React, {Component} from 'react';
import { Switch, Route} from "react-router-dom";
import Login from '../login/login'
import Register from "../../Register";
import studentProfile from "../../student/student-profile";
import instructorProfile from '../../instructor/instructor-profile';
import instructorRegister from '../../instructor/register-in';
import studentEdit from '../../student/student-edit'
import adminProfile from "../../admin/admin-profile";
import forgotPassword from '../../ForgotPassword';


export default class Main extends Component{

    render() {
        return(
            <div>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/api/contact/" component={Login} />
                    <Route path="/api/about/" component={Login} />
                    <Route path="/api/student/register/" component={Register} />
                    <Route path="/api/student/edit/:id" component={studentEdit} />
                    <Route path="/api/student/:id" component={studentProfile} />
                    <Route path="/api/instructor/register/" component={instructorRegister} />
                    <Route path="/api/instructor/:id" component={instructorProfile} />
                    <Route path="/api/admin/:id" component={adminProfile} />
                    <Route path="/api/login/forgot_password" component={forgotPassword} />
                </Switch>
            </div>
        )
    }
}