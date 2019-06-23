import React, {Component} from 'react';
import '../../assets/styles/user.css';
import axios from 'axios';
//import forgotPassword from "../content/forgotPassword";
/*let AWS = require('aws-sdk/dist/aws-sdk');

    AWS = window.AWS;*/

//const bcrypt = require('bcrypt');

export default class forgotPassword extends Component{

    constructor(props){
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeUserType = this.onChangeUserType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state={
            email: '',
            userType: 'userType',
            submitted: false,
            valid: false,
            student: []
        }

    }

    onChangeEmail(e){
        e.preventDefault();

        this.setState({
            email: e.target.value,
            submitted: false
        })
    }

    onChangeUserType(e){
        e.preventDefault();

        this.setState({
            userType: e.target.value,
            submitted: false
        })
    }

    //login
    onSubmit(e){
        e.preventDefault();
        console.log(this.state);
        this.setState({
            submitted: true
        });
        //console.log(this.state);
        const user = {
            email: this.state.email,
        };

        if(this.validateType()) {

            let a = "",
                b = "abcdefghijklmnopqrstuvwxyz1234567890",
                c = 8;
            for(let ma = 0; ma < c; ma++) {
                a += b[Math.floor(Math.random() * b.length)];
            }

            if (this.state.userType === 'student') {

                const email = {
                    email: this.state.email
                };

                axios.post('http://localhost:4000/api/student/profile', email)
                    .then(response => {
                        this.setState({
                            student: response.data
                        });

                        console.log('password - ' + a);

                        const newStudent = {
                            email: this.state.email,
                            fullName: this.state.student.fullName,
                            contactNum: this.state.student.contactNum,
                            password: a
                        };


                            axios.put('http://localhost:4000/api/student/forgotPassword', newStudent)
                                .then(res => {
                                    console.log(res.data);
                                    console.log('password reset');

                                    alert('password resetting finished, check your mail');
                                    window.location.assign('/');
                                });

                        })

                        /*console.log(this.state.student);
                        console.log('get');*/

                    .catch(err => {
                        console.log(err);
                        alert('check your email');
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
        if(this.state.userType === 'userType'){
            isValid = false;
        }

        return isValid;
    }


    render() {
        return(

            <div style={{backgroundColor: 'black', float: 'left', width: '1365px', height: '530px'}}>
                <div className="d5" style={{}}>

                    <div className="d4" style={{height: '280px'}}>
                        <h4 style={{margin: '0 0 0 50px'}}>Forgot Password</h4>
                        <form onSubmit={this.onSubmit} >
                            <div>
                                <input className="field01" type="email" value={this.state.email} onChange={this.onChangeEmail}
                                       placeholder="           User Email " />
                            </div>
                            <div>
                                <select className="select1" style={{width: '120px', height: '30px', margin: '18px 0 0 70px'}}
                                        onChange={this.onChangeUserType} >
                                    <option value="userType">User Type</option>
                                    <option value="student">Student</option>
                                    <option value="staff">Staff</option>
                                    <option value="admin">Admin</option>
                                </select></div>
                            <div>
                                <input className="btn01" style={{backgroundColor: '#005ce6'}} type="submit" value="Reset and send a mail"  />
                            </div>
                        </form>
                        {
                            this.state.email === '' && this.state.submitted === false &&
                            <div style={{color: 'green', fontSize: 'small'}}>email field is empty </div>
                        }
                        {
                            this.state.userType === 'userType' && this.state.submitted &&
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