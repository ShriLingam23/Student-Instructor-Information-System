import React, {Component} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import Swal from 'sweetalert2';
import {BASE_URL} from '../../index';
//const BASE_URL = 'http://localhost:4000/';

export default class Login extends Component {

    constructor(props) {
        super(props);

        //initialize state
        this.state = {
            email: '',
            password: ''
        };
    }

    //assign values to state
    onChangeHandler = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    handleLoginSubmit = (e) => {
        e.preventDefault();

        const loginData = {
            email: this.state.email,
            password: this.state.password
        };

        //verify login using axios get method
        axios
            .post(BASE_URL + 'instructors/login', loginData)
            .then(res => {
                if (res.data.status === 200) {

                    Swal.fire({
                        title: 'Login Successful',
                        type: 'success',
                        confirmButtonText: 'OK!',
                    }).then((result) => {

                        if (result.value) {
                            //set user email for session
                            sessionStorage.setItem('userId', res.data.data._id);
                            sessionStorage.setItem('loggedUser', this.state.email);
                            this.props.history.push('/');

                            // if (localStorage.value === 'home') {
                            //     this.props.history.push('/');
                            //     localStorage.removeItem('value');
                            // } else if (localStorage.value === 'result') {
                            //     this.props.history.push('/booking');
                            //     localStorage.removeItem('value');
                            // }
                        }
                    });
                } else {
                    Swal.fire('Login Failure', 'Incorrect Email or Password', 'error');
                }
            })
            .catch(err => console.log(err.message));

    };

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
                                <span className="input-group-text"><i className="fa fa-envelope-o"/></span>
                            </div>
                            <input type="email"
                                   className="form-control mr-3"
                                   id="email"
                                   value={this.state.email}
                                   onChange={this.onChangeHandler}
                                   placeholder="Email"
                                   required/>
                        </div>

                        <div className="input-group mb-3 mb-3 ml-2 mr-2 mt-2">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa-key"/></span>
                            </div>
                            <input type="password"
                                   className="form-control mr-3"
                                   id="password"
                                   value={this.state.password}
                                   onChange={this.onChangeHandler}
                                   placeholder="Password"
                                   required/>
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

