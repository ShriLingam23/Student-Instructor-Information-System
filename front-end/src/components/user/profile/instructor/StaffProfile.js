import React, {Component} from 'react';
import {Link} from "react-router-dom";
import '../../../../assets/css/user.css';
import axios from 'axios';
import userProfile from '../../../../assets/img/userProfile.jpg';
import {IoIosPerson} from "react-icons/io"
import {IoIosContact} from "react-icons/io"
import {IoIosKey} from "react-icons/io"
import {MdPhone} from "react-icons/md"
import {IoIosMail} from "react-icons/io"
import {IoIosBook} from "react-icons/io"
import {FiUserCheck} from 'react-icons/fi'
import Swal from "sweetalert2";

export default class StaffProfile extends Component {

    constructor(props) {
        super(props);

        if (sessionStorage.getItem('loggedUser') === null) {
            window.location.assign('/');
        }

        this.state = {
            staff: '',
            fullName:'',
            email:'',
            profession:'',
            contactNum:'',
            response:''
        };

    }

    componentDidMount() {
        axios.get('http://localhost:4000/staffs/profile/data' + sessionStorage.getItem('userId'))
            .then(response => {
                this.setState({
                    staff: response.data
                });
            })
            .catch(err => {
                console.log(err);
            })
    }

    onChangeHandler = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    validate = () => {

        let isValid = true;
        let errors = {};

        errors["Submitted"] = 'Submitted';


        if (!this.state.fullName.match(/^[a-zA-Z ]*$/)) {
            Swal.fire('Oops...', 'Only Letters', 'error');
            isValid = false;
        }

        if (!this.state.response.match(/^[a-zA-Z ]*$/)) {
            Swal.fire('Oops...', 'Only Letters', 'error');
            isValid = false;
        }

        if (!this.state.contactNum.match(/^[0-9+ ]*$/)) {
            Swal.fire('Oops...', 'Enter Numbers and + sign only', 'error');
            isValid = false;
        }

        if (this.state.contactNum.length < 9) {
            Swal.fire('Oops...', 'Minimum 9 characters', 'error');
            isValid = false;
        }


        this.setState({
            error: errors
        });

        console.log(isValid);
        return isValid;

    };


    onSubmitHandler = e => {
        e.preventDefault();

        if (this.validate()) {
            const profileData = {
                fullName: this.state.fullName,
                contactNum:this.state.contactNum,
                response:this.state.response
            };

            axios.put('http://localhost:4000/todos/students', profileData)
                .then(res => {
                    console.log(res.data);
                    console.log('successfully added new student');
                });
        } else {
            Swal.fire('Oops...', 'Please Input Valid Data', 'error');
        }

    };


    render() {
        return (
            <div className="container" style={{paddingTop: '20px'}}>

                <main role="main" style={{marginTop: '10px'}}>

                    <section className="jumbotron text-center">
                        <div className="container"
                             style={{backgroundColor: '#f9fbe7', marginTop: '-30px', marginBottom: '-30px'}}>

                            <div className='row'>
                                <div className='col-md-4 bg-info text-white text-center'>
                                    <div className="card-body">
                                        <FiUserCheck size="200px" style={{paddingTop: '50px'}}/>
                                        <h2 className="py-3">Profile</h2>
                                        <p>
                                            Elective/Humanity Registration Course Web Student Profile Official Requests
                                            ... Life at LOOPs promises a vibrant future for our students. Student
                                            interactive communities, clubs & societies, sports and competitions

                                        </p>
                                    </div>
                                </div>

                                {/* form section */}
                                <div className="col-md-8 py-5 border">
                                    <div className="pb-4 form-control bg-dark text-info text-light"
                                         style={{marginBottom: '20px', height: '50px'}}><h4><IoIosContact
                                        size='40px'/> Instructor Profile Information</h4></div>

                                    <form onSubmit={this.onSubmitHandler}>
                                        <div className="input-group form-group ">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><IoIosPerson/></div>
                                            </div>
                                            <input
                                                id="fullName"
                                                placeholder="Staff Name"
                                                className="form-control"
                                                type="text"
                                                onChange={this.onValueChange}
                                                value={this.state.fullName}/>
                                        </div>
                                        <div className="input-group form-group ">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><IoIosMail/></div>
                                            </div>
                                            <input
                                                id="email"
                                                placeholder="Email"
                                                className="form-control"
                                                readOnly
                                                type="text"
                                                value={this.state.email}/>
                                        </div>

                                        <div className="input-group form-group ">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><IoIosMail/></div>
                                            </div>
                                            <input
                                                id="profession"
                                                placeholder="profession"
                                                className="form-control"
                                                readOnly
                                                type="text"
                                                value={this.state.profession}/>
                                        </div>

                                        <div className="input-group form-group ">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><MdPhone/></div>
                                            </div>
                                            <input
                                                id="contactNum"
                                                placeholder="Contact Number"
                                                className="form-control"
                                                type="text"
                                                onChange={this.onValueChange}
                                                value={this.state.contactNum}/>
                                        </div>

                                        <div className="input-group form-group ">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><MdPhone/></div>
                                            </div>
                                            <input
                                                id="response"
                                                placeholder="Response"
                                                className="form-control"
                                                type="text"
                                                onChange={this.onValueChange}
                                                value={this.state.response}/>
                                        </div>
                                        <br/>
                                        <div className="form-row" style={{display: 'flex', justifyContent: 'center'}}>
                                            <button className="btn btn-danger" >Update</button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>

                    </section>
                </main>
            </div>
        )
    }
}