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

export default class AdminProfile extends Component {

    constructor(props) {
        super(props);

        const sessionEmail = sessionStorage.getItem('loggedUser');
        const userType = sessionStorage.getItem('userType');

        if (sessionEmail === null) {
            console.log('in session checking');
            window.location.assign('/');
        } else {
            console.log('session validated');
        }
        console.log('constr');
        //console.log(this.props.match.params.id);

        this.onChangeCampus = this.onChangeCampus.bind(this);
        this.onChangeConPassword = this.onChangeConPassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeFullName = this.onChangeFullName.bind(this);
        this.onChangeID = this.onChangeID.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);

        this.state = {
            fullName: '',
            stId: '',
            email: '',
            phone: '',
            campus: 'Malabe',
            password: '',
            conPassword: '',
            sessionEmail: sessionStorage.getItem('email'),
            error: {},
            student: []
        };

    }

    componentDidMount() {
        console.log(this.props.match.params.id);
        const email = {
            email: this.props.match.params.id
        };

        axios.post('http://localhost:4000/api/student/profile', email)
            .then(response => {
                this.setState({
                    student: response.data
                });
                console.log(this.state.student);
                console.log('get');
            })
            .catch(err => {
                console.log(err);
            })
    }

    onChangeFullName(e) {
        this.setState({
            fullName: e.target.value
        });
    }

    onChangeID(e) {
        this.setState({
            stId: e.target.value
        })
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

    onChangeCampus(e) {
        this.setState({
            campus: e.target.value
        });

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

    logout(e) {
        e.preventDefault();
        console.log('this is logout');

        sessionStorage.removeItem('email');
        sessionStorage.removeItem('userType');

        window.location.assign('/');
    }

    onSubmit = e => {
        e.preventDefault();

        if (this.validate()) {
            console.log('submitted');
            console.log(this.state);

            const newStudent = {
                fullName: this.state.fullName,
                stdID: this.state.stId,
                email: this.state.email,
                phone: this.state.phone,
                campus: this.state.campus,
                password: this.state.password
            };

            axios.post('http://localhost:4000/todos/students', newStudent)
                .then(res => {
                    console.log(res.data);
                    console.log('successfully added new student');
                });
        } else {
            /* let ss = this.state.error;
             ss.map(value =>
                 value.reduce((op, {title, answer}) => {
                     op[title] = answer;
                     console.log(op);
                     //return op;
                 },{})
             );*/
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
                                        size='40px'/> Admin Profile Information</h4></div>

                                    <form id='staffForm'>
                                            <div className="input-group form-group ">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text"><IoIosPerson/></div>
                                                </div>
                                                <input
                                                    name="fullName"
                                                    placeholder="Admin Name"
                                                    className="form-control"
                                                    type="text"
                                                    // onChange={this.onValueChange}
                                                    value={this.state.fullName}/>
                                            </div>
                                            <div className="input-group form-group ">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text"><IoIosMail/></div>
                                                </div>
                                                <input
                                                    name="email"
                                                    placeholder="Email"
                                                    className="form-control"
                                                    readOnly
                                                    type="text"
                                                    // onChange={this.onValueChange}
                                                    value={this.state.email}/>
                                            </div>
                                            <div className="input-group form-group ">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text"><IoIosKey/></div>
                                                </div>
                                                <input
                                                    id="password"
                                                    name="password"
                                                    placeholder="Password"
                                                    className="form-control"
                                                    type="password"
                                                    value={this.state.password}
                                                />
                                            </div>
                                            <div className="input-group form-group ">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text"><MdPhone/></div>
                                                </div>
                                                <input
                                                    name="courseName"
                                                    placeholder="Contact Number"
                                                    className="form-control"
                                                    type="text"
                                                    // onChange={this.onValueChange}
                                                    value={this.state.contactNum}/>
                                            </div>
                                        <br/>
                                        <div className="form-row" style={{display: 'flex', justifyContent: 'center'}}>
                                            <button role='button' className="btn btn-danger"
                                                    onClick={this.toBack}>Update
                                            </button>
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