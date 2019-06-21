import React, {Component} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import Swal from "sweetalert2";

const BASE_URL = 'http://localhost:4000/';

export default class Register extends Component {
    //initialize state
    state = {
        email: '',
        password: '',
        repeatPassword: '',
    };

    //assign values to state
    onChangeHandler = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    handleRegisterSubmit = (e) => {
        e.preventDefault();

        if (this.state.password === this.state.repeatPassword) {
            const userData = {
                email: this.state.email,
                password: this.state.password,
            };

            //register user using axios post method
            axios
                .post(BASE_URL + 'instructors/register', userData)
                .then(res => {
                    if (res.data) {

                        Swal.fire({
                            title: 'User Registered Successfully',
                            type: 'success',
                            confirmButtonText: 'OK!',
                        }).then((result) => {
                            if (result.value) {
                                this.props.history.push('/login');
                            }
                        });
                    } else {
                        Swal.fire('User already exist', '', 'error');
                    }
                })
                .catch(err => console.log(err.message + err.status));
        } else {
            Swal.fire('Password does not match', '', 'error');
        }
    };

    render() {
        return (
            <div className="col-md-8 col-lg-6 offset-md-2 offset-lg-3">
                <br/><br/><br/>
                <br/><br/>
                <div className="card">
                    <form onSubmit={this.handleRegisterSubmit}>

                        <div className="card-header ">
                            <h4 className="text-center">Sign Up</h4>
                        </div>
                        <br/>

                                                <div className="input-group mb-3 ml-2 mr-2 mt-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa-envelope-o"/></span>
                            </div>
                            <input type="email"
                                   className="form-control mr-3"
                                   id="email"
                                   placeholder="Email"
                                   value={this.state.email}
                                   onChange={this.onChangeHandler}
                                   required/>
                        </div>

                        <div className="input-group mb-3 ml-2 mr-2 mt-2">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa-key"/></span>
                            </div>
                            <input type="password"
                                   className="form-control mr-3"
                                   id="password"
                                   placeholder="Password"
                                   value={this.state.password}
                                   onChange={this.onChangeHandler}
                                   required/>
                        </div>

                        <div className="input-group mb-3 ml-2 mr-2 mt-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa-key"/></span>
                            </div>
                            <input type="password"
                                   className="form-control mr-3"
                                   id="repeatPassword"
                                   placeholder="Repeat Password"
                                   value={this.state.repeatPassword}
                                   onChange={this.onChangeHandler}
                                   required/>
                        </div>

                        <br/>
                        <div className="col text-center">
                            <input type="submit" className="btn btn-dark" value="Register"/>
                            <br/><br/>
                            <label className="d-inline text-muted">Already have an account ?</label>
                            <Link to="/login" className="alert-link d-inline"> Sign In</Link>
                        </div>
                    </form>
                    <br/>
                </div>
                <br/><br/>
            </div>
        )
    }
}

