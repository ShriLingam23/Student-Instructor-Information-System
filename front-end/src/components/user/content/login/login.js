import React, {Component} from 'react';
import '../../../assets/styles/user.css';
import {Switch, Route, Link} from "react-router-dom";
import axios from 'axios';
import forgotPassword from "../forgotPassword";
/*let AWS = require('aws-sdk/dist/aws-sdk');

    AWS = window.AWS;*/

//const bcrypt = require('bcrypt');

export default class Login extends Component{

    constructor(props){
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeUserType = this.onChangeUserType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state={
            email: '',
            password: '',
            userType: 'User Type',
            submitted: false,
            valid: false,
            instr: []

        }

    }

    onChangeEmail(e){
        e.preventDefault();

        this.setState({
            email: e.target.value,
            submitted: false
        })
    }

    onChangePassword(e){
        e.preventDefault();

        this.setState({
            password: e.target.value,
            submitted: false
        })
    }

    onChangeUserType(e){
        e.preventDefault();

        this.setState({
            userType: e.target.value
        })
    }

    //login
    onSubmit(e){
        e.preventDefault();
        this.setState({
            submitted: true
        });
        //console.log(this.state);
        const user = {
            email: this.state.email,
            inputtedPassword: this.state.password
        };

        if(this.validateType()) {

            if (this.state.userType === 'student') {
                axios.post('http://localhost:4000/api/student/login', user)
                    .then(response => {

                        console.log(response.data);

                        if (response.data) {
                            this.setState({
                                valid: true
                            });

                            sessionStorage.setItem('email', user.email);
                            sessionStorage.setItem('userType', 'student');

                            window.location.assign('/api/student/' + user.email);
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    });

            }else if(this.state.userType === 'staff'){

                console.log('type = staff');
                axios.post('http://localhost:4000/api/staff/login', user)
                    .then(response => {
                        //console.log('sssssss');
                        this.setState({
                            //instr: response.data
                        });

                        sessionStorage.setItem('email', user.email);
                        sessionStorage.setItem('userType', 'staff');

                        console.log(response.data);

                        if (response.data) {
                            this.setState({
                                valid: true
                            });

                            window.location.assign('/api/instructor/' + user.email);
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    });

            }else if(this.state.userType === 'admin'){
                console.log('type = admin');
                axios.post('http://localhost:4000/api/admin/login', user)
                    .then(response => {
                        //console.log('sssssss');
                        this.setState({
                            //instr: response.data
                        });
                            //console.log('setting session - ' + user.email);
                        sessionStorage.setItem('email', user.email);
                        sessionStorage.setItem('userType', 'admin');

                        console.log(response.data);

                        if (response.data) {
                            this.setState({
                                valid: true
                            });

                            window.location.assign('/api/admin/' + user.email);
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    });
            }

        }



    }

    validateType(){
        let isValid = true;
        console.log('validating type');
        if(this.state.userType === 'User Type'){
            isValid = false;
        }

        return isValid;
    }


    render() {
        return(

            <div style={{backgroundColor: 'black', float: 'left', width: '1365px', height: '530px'}}>
                <div className="d5">

                    <div className="d4">
                        <h4 style={{margin: '0 0 0 50px'}}>Member Login</h4>
                        <form onSubmit={this.onSubmit} >
                        <div>
                            <input className="field01" type="text" value={this.state.email} onChange={this.onChangeEmail}
                                   placeholder="           User Email " />
                        </div>
                        <div>
                            <input className="field01" type="text" value={this.state.password} onChange={this.onChangePassword}
                                   placeholder="            Password" />
                        </div>
                                <Link to="/api/login/forgot_password">
                                    <div style={{fontSize: 'small',float: 'right', color: 'red'}}>Forgot Password</div>
                                </Link>
                            <div>
                                <select className="select1" style={{width: '120px', height: '30px', margin: '18px 0 0 70px'}}
                                        onChange={this.onChangeUserType} >
                                    <option value="">User Type</option>
                                    <option value="student">Student</option>
                                    <option value="staff">Staff</option>
                                    <option value="admin">Admin</option>
                                </select></div>
                        <div>
                            <input className="btn01" style={{backgroundColor: '#005ce6'}} type="submit" value="Login"  />
                        </div>
                        </form>
                        <div>
                            <Link to="/api/student/register/">
                            <input className="btn01" style={{margin: '8px 0 0 35px', backgroundColor: '#00cc00'}}
                                   type="Button" value="Sign Up" />
                            </Link>
                        </div>
                        {
                            this.state.submitted === true && this.state.valid === false && this.state.userType !== 'User Type' &&
                            <div style={{color: 'red'}}> password or user id is invalid </div>
                        }
                        {
                            this.state.userType === 'User Type' && this.state.submitted &&
                            <div style={{color: 'red'}}> select a user type </div>
                        }


                    </div>

                </div>
                <div className="d3"> <div style={{margin: '30px 0 0 100px', backgroundColor: 'black',
                    color: 'white', width: '550px', height: '450px',opacity: '0.7', padding: '15px'}}>
                    <div>
                        <h4>VISION:</h4>
                        The College of Education will be a world leader in the integration of (a) teaching and learning,
                        (b) advancement of the knowledge base through research and scholarship, and (c) leadership in
                        service
                        and outreach. Further, the College will be a world leader in preparing professionals who provide
                        leadership
                        and exemplary educational and related services to improve the lives of individuals in a changing
                        and complex global society.
                    </div>

                    <div style={{margin: '25px 0 0 0'}}>
                        <h4>MISSION:</h4>
                        The mission of the College of Education at Penn State is to deepen and extend knowledge about
                        the formation and utilization of human capabilities.

                    </div>

                </div></div>

            </div>

        )
    }


}