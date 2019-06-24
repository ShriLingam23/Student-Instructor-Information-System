import React, {Component} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import Swal from 'sweetalert2';

export default class Register extends Component {

    constructor(props) {
        super(props);

        this.onChangeConPassword = this.onChangeConPassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeFullName = this.onChangeFullName.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);

        this.state = {
            fullName: '',
            email: '',
            phone: '',
            password: '',
            conPassword: '',
            error: {}
        };

    }

    onChangeFullName(e) {
        this.setState({
            fullName: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onChangePhone(e) {
        this.setState({
            phone: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    onChangeConPassword(e) {
        this.setState({
            conPassword: e.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault();

        if (this.validate()) {
            console.log('submitted');
            console.log(this.state);

            const newStudent = {
                fullName: this.state.fullName,
                email: this.state.email,
                contactNum: this.state.phone,
                password: this.state.password
            };

            axios.post('http://localhost:4000/students/register', newStudent)
                .then(res => {
                    console.log(res.data);

                    if (res.data.data) {
                        Swal.fire({
                            title: 'Registration Successful',
                            type: 'success',
                            confirmButtonText: 'OK!',
                        }).then((result) => {

                            if (result.value) {
                                sessionStorage.setItem('userId', res.data.data._id);
                                sessionStorage.setItem('loggedUser', res.data.data.email);
                                sessionStorage.setItem('userType', 'student');
                                window.location.assign('/home');
                            }
                        });
                    }else {
                        Swal.fire('Oops...', 'Student is already exist', 'error');
                    }
                })
                .catch(err => {
                    console.log(err);
                    Swal.fire('Oops...', 'Registration Failed', 'error');
                });

            this.setState({
                fullName: '',
                stdID: '',
                email: '',
                phone: '',
                campus: '',
                password: '',
                conPassword: ''
            })
        } else {
            alert('Check the validation');
        }

    };

    validate = () => {

        let isValid = true;
        let errors = {};

        errors["Submitted"] = 'Submitted';

        console.log("validation worked");

        if (!this.state.fullName.match(/^[a-zA-Z ]*$/)) {

            errors["Full Name"] = 'Only Letters ';
            isValid = false;
        }

        if (!this.state.phone.match(/^[0-9+ ]*$/)) {
            errors["Conatct"] = 'Enter Numbers and + sign only';
            isValid = false;
        }

        if (this.state.phone.length < 9) {
            errors["Conatct"] = 'Minimum 9 characters';
            isValid = false;
        }

        if (this.state.password.length < 8) {
            errors["Password"] = 'Minimum 8 characters';
            isValid = false;
        }

        if (this.state.conPassword !== this.state.password) {
            errors["Password"] = 'Passwords Des not match';
            isValid = false;
        }

        this.setState({
            error: errors
        });

        console.log(isValid);
        return isValid;

    };


    render() {
        return (
            <div className=" mt-5 col-md-8 col-lg-6 offset-md-2 mx-auto offset-lg-3">
                <div className="card">

                    <form onSubmit={this.onSubmit}>

                        <div className="card-header ">
                            <h4 className="text-center">STUDENT REGISTRATION</h4>
                        </div>
                        <br/>

                        <div className="input-group ml-2 mr-2 mt-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa-user-circle"/></span>
                            </div>
                            <input type="text"
                                   className="form-control mr-3"
                                   id="fullName"
                                   value={this.state.fullName}
                                   onChange={this.onChangeFullName}
                                   placeholder="Enter your name"
                                   required/>
                        </div>
                        {this.state.fullName === '' &&
                        <div style={{fontSize: 'small', float: 'right', color: 'green', margin: '0 10px 0 0'}}>The name
                            field is empty</div>}
                        {
                            !this.state.fullName.match(/^[a-zA-Z ]*$/) &&
                            <div style={{fontSize: 'small', float: 'right', color: 'red', margin: '0 10px 0 0'}}>Enter
                                Only Alphabet Characters Only</div>
                        }
                        <br/>

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
                        {this.state.email === '' &&
                        <div style={{fontSize: 'small', float: 'right', color: 'green', margin: '0 10px 0 0'}}>The email
                            field is empty</div>}
                        <br/>

                        <div className="input-group ml-2 mr-2 mt-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa-phone"/></span>
                            </div>
                            <input type="text"
                                   className="form-control mr-3"
                                   id="phone"
                                   value={this.state.phone}
                                   onChange={this.onChangePhone}
                                   placeholder="Phone Number: eg-07********"
                                   required/>
                        </div>
                        {this.state.phone === '' &&
                        <div style={{fontSize: 'small', float: 'right', color: 'green', margin: '0 10px 0 0'}}>The name
                            field is empty</div>}
                        {
                            !this.state.phone.match(/^[0-9+ ]*$/) && this.state.phone !== '' &&
                            <div style={{fontSize: 'small', float: 'right', color: 'red', margin: '0 10px 0 0'}}>use
                                Only number Characters and '+' Only</div>
                        }
                        {
                            this.state.phone.length < 9 && this.state.phone !== '' &&
                            <div style={{fontSize: 'small', float: 'right', color: 'red', margin: '0 10px 0 0'}}>Minimum
                                9 numbers.</div>
                        }
                        <br/>

                        <div className="input-group ml-2 mr-2 mt-3">
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
                        {this.state.password === '' &&
                        <div style={{fontSize: 'small', float: 'right', color: 'green', margin: '0 10px 0 0'}}>The
                            password field is empty</div>}
                        {
                            (this.state.password.length < 8) && this.state.password !== '' &&
                            <div style={{fontSize: 'small', float: 'right', color: 'red', margin: '0 10px 0 0'}}>Enter
                                more than 8 characters</div>
                        }
                        <br/>

                        <div className="input-group ml-2 mr-2 mt-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa-key"/></span>
                            </div>
                            <input type="password"
                                   className="form-control mr-3"
                                   id="conPassword"
                                   value={this.state.conPassword}
                                   onChange={this.onChangeConPassword}
                                   placeholder="Re-type password"
                                   required/>
                        </div>
                        {this.state.conPassword === '' &&
                        <div style={{fontSize: 'small', float: 'right', color: 'green', margin: '0 10px 0 0'}}>The
                            confirm password field is empty</div>}
                        {
                            (this.state.password !== this.state.conPassword) && this.state.conPassword !== '' &&
                            <div style={{fontSize: 'small', float: 'right', color: 'red', margin: '0 10px 0 0'}}>Not
                                matching with password</div>
                        }
                        <br/>
                        <br/>
                        <div className="col text-center">
                            <input type="submit" className="btn btn-dark" value="Sign Up"/>
                        </div>

                        <div className="text-center mt-3">
                            <label className="ml-5 mb-3 text-muted">Have an account ?</label>
                            <Link to="/" className="alert-link mr-5"> Sign In</Link>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}