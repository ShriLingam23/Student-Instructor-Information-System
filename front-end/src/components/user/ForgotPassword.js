import React, {Component} from 'react';
import '../../assets/css/user.css';
import axios from 'axios';
import Swal from "sweetalert2";
import {Link} from "react-router-dom";
//import forgotPassword from "../content/forgotPassword";
/*let AWS = require('aws-sdk/dist/aws-sdk');

    AWS = window.AWS;*/

//const bcrypt = require('bcrypt');

export default class ForgotPassword extends Component {

    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeUserType = this.onChangeUserType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            userType: 'userType',
            submitted: false,
            valid: false,
            student: []
        }

    }

    onChangeEmail(e) {
        e.preventDefault();

        this.setState({
            email: e.target.value,
            submitted: false
        })
    }

    onChangeUserType(e) {
        e.preventDefault();

        this.setState({
            userType: e.target.value,
            submitted: false
        })
    }

    //login
    onSubmit(e) {
        e.preventDefault();
        console.log(this.state);
        this.setState({
            submitted: true
        });
        //console.log(this.state);
        const user = {
            email: this.state.email,
        };

        if (this.validateType()) {

            let a = "",
                b = "abcdefghijklmnopqrstuvwxyz1234567890",
                c = 8;
            for (let ma = 0; ma < c; ma++) {
                a += b[Math.floor(Math.random() * b.length)];
            }

            if (this.state.userType === 'student') {

                const email = {
                    email: this.state.email
                };

                axios.post('http://localhost:4000/students/profile', email)
                    .then(response => {
                        this.setState({
                            student: response.data
                        });
                        console.log('password - ' + a);

                        const newStudent = {
                            email: this.state.email,
                            password: a
                        };


                        axios.put('http://localhost:4000/students/forgot-password/' + response.data._id, newStudent)
                            .then(res => {
                                console.log(res.data);
                                console.log('password reset');
                                Swal.fire('Password resetting finished...', 'Check Your Mail', 'success');
                                window.location.assign('/');
                            })
                            .catch(err => {
                            console.log(err);
                            Swal.fire('Oops...', 'Reset Failed', 'error');
                        });

                    })

                    /*console.log(this.state.student);
                    console.log('get');*/

                    .catch(err => {
                        console.log(err);
                        Swal.fire('Oops...', 'Invalid Email Id', 'error');
                    });
            }
        }

    }

    validateType() {
        let isValid = true;
        console.log('validating type');
        if (this.state.userType === 'userType') {
            isValid = false;
        }

        return isValid;
    }


    render() {
        return (
            <div className=" mt-5 col-md-8 col-lg-6 offset-md-2 mx-auto offset-lg-3">
                <br/><br/><br/><br/>
                <div className="card">

                    <form onSubmit={this.onSubmit}>

                        <div className="card-header ">
                            <h4 className="text-center">Forgot Password</h4>
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

                        <div className="input-group ml-2 mr-2 mt-3">
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
                        <br/>
                        <div className="col text-center">
                            <input type="submit" className="btn btn-dark" value="Reset and Send a Mail"/>
                        </div>
                    </form>
                    <br/>
                    <div className="text-center ml-5">
                        <label className="ml-1 mb-3 text-muted">Go to </label>
                        <Link to="/" className="alert-link mr-5"> Sign In</Link>
                        <br/>
                    </div>
                </div>
            </div>

        )
    }

}