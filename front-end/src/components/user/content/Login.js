import React, {Component} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import Swal from 'sweetalert2';
import {BASE_URL} from '../../..';
//const BASE_URL = 'http://localhost:4000/';

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeUserType = this.onChangeUserType.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);

        this.state = {
            email: '',
            password: '',
            userType: 'UserType'
        }

    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value,
        })
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value,
        })
    }

    onChangeUserType(e) {
        this.setState({
            userType: e.target.value
        })
    }

    validateType() {
        let isValid = true;
        console.log('validating type');

        if (this.state.userType === 'UserType') {
            Swal.fire('Oops...', 'Please Select User Type', 'error');
            isValid = false;
        }

        return isValid;
    }

    handleLoginSubmit(e) {
        e.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password
        };

        if (this.validateType()) {

            if (this.state.userType === 'student') {

                axios.post('http://localhost:4000/students/login', user)
                    .then(response => {


                        if (response.data.result) {
                            Swal.fire({
                                title: 'Login Successful',
                                type: 'success',
                                confirmButtonText: 'OK!',
                            }).then((result) => {

                                if (result.value) {
                                    sessionStorage.setItem('userId', response.data.data._id);
                                    sessionStorage.setItem('loggedUser', response.data.data.email);
                                    sessionStorage.setItem('userType', 'student');
                                    window.location.assign('/home');
                                }
                            });
                        } else {
                            Swal.fire('Oops...', 'Invalid Password or User Id', 'error');
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    });

            } else if (this.state.userType === 'instructor' || this.state.userType === 'admin') {

                axios.post('http://localhost:4000/staffs/login', user)
                    .then(response => {


                        if (response.data.result) {

                            Swal.fire({
                                title: 'Login Successful',
                                type: 'success',
                                confirmButtonText: 'OK!',
                            }).then((result) => {

                                if (result.value) {
                                    sessionStorage.setItem('userId', response.data.data._id);
                                    sessionStorage.setItem('loggedUser', response.data.data.email);

                                    if (response.data.data.profession === 'Admin') {
                                        sessionStorage.setItem('userType', 'admin');
                                        window.location.assign('/home');
                                    } else {
                                        sessionStorage.setItem('userType', 'instructor');
                                        window.location.assign('/home');
                                    }
                                }
                            });
                        } else {
                            Swal.fire('Oops...', 'Invalid Password or User Id', 'error');
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    });

            }

        }
    }

    render() {
        return (
            <div className=" mt-5 col-md-8 col-lg-6 offset-md-2 mx-auto offset-lg-3">
                <br/><br/><br/>
                <div className="card">

                    <form onSubmit={this.handleLoginSubmit}>

                        <div className="card-header ">
                            <h4 className="text-center">Sign In</h4>
                        </div>
                        <br/>

                        <div className="input-group mb-3 ml-2 mr-2 mt-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa-user"/></span>
                            </div>
                            <select className="form-control mr-3" onChange={this.onChangeUserType}>
                                <option value="UserType">----Select User Type---</option>
                                <option value="student">Student</option>
                                <option value="instructor">Instructor</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        <div className="input-group mb-3 ml-2 mr-2 mt-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa-envelope-o"/></span>
                            </div>
                            <input type="email"
                                   className="form-control mr-3"
                                   id="email"
                                   value={this.state.email}
                                   onChange={this.onChangeEmail}
                                   placeholder="Email"
                                   required/>
                        </div>

                        <div className="input-group mb-2 ml-2 mr-2 mt-2">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa-key"/></span>
                            </div>
                            <input type="password"
                                   className="form-control mr-3"
                                   id="password"
                                   value={this.state.password}
                                   onChange={this.onChangePassword}
                                   placeholder="Password"
                                   required/>
                        </div>
                        <div className="text-center mb-2 ml-5">
                            <Link to="/forgot-password" className="alert-link mr-5">Forgot Password ?</Link>
                        </div>
                        <br/>
                        <div className="col text-center">
                            <input type="submit" className="btn btn-dark" value="Login"/>
                        </div>

                        <div className="text-center mt-3">
                            <label className="ml-5 mb-3 text-muted">Don't have an account ?</label>
                            <Link to="/register" className="alert-link mr-5"> Sign Up</Link>
                        </div>
                    </form>
                    <br/>
                </div>
                <br/><br/><br/><br/><br/><br/>
            </div>
        )
    }
}

