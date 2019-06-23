import React, {Component} from 'react';
import {Link} from "react-router-dom";
import '../../assets/styles/user.css';
import axios from 'axios';
import userProfile from '../../assets/images/userProfile.jpg';


export default class studentProfile extends Component{

    constructor(props){
        super(props);

        const sessionEmail = sessionStorage.getItem('email');
        const userType = sessionStorage.getItem('userType');

        if(sessionEmail === null){
            console.log('in session checking');
            window.location.assign('/');
        }else{
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

    onChangeFullName(e){
        this.setState({
            fullName: e.target.value
        });
    }

    onChangeID(e){
        this.setState({
            stId: e.target.value
        })
    }

    onChangeEmail(e){
        this.setState({
            email: e.target.value
        })
    }

    onChangePhone(e){
        this.setState({
            phone: e.target.value
        })
    }

    onChangeCampus(e){
        this.setState({
            campus: e.target.value
        });

    }

    onChangePassword(e){
        this.setState({
            password: e.target.value
        })
    }

    onChangeConPassword(e){
        this.setState({
            conPassword: e.target.value
        })
    }

    logout(e){
        e.preventDefault();
        console.log('this is logout');

        sessionStorage.removeItem('email');
        sessionStorage.removeItem('userType');

        window.location.assign('/');
    }

    onSubmit = e => {
        e.preventDefault();

        if(this.validate()){
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
        }
        else{
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

    validate =() =>{

        let isValid = true;
        let errors = {};

        errors["Submitted"] = 'Submitted';

        console.log("validation worked");

        if(!this.state.fullName.match(/^[a-zA-Z ]*$/)){

            errors["Full Name"] = 'Only Letters ';
            isValid = false;
        }

        if (!this.state.phone.match(/^[0-9+ ]*$/)){
            errors["Conatct"] = 'Enter Numbers and + sign only';
            isValid = false;
        }

        if(this.state.phone.length < 9){
            errors["Conatct"] = 'Minimum 9 characters';
            isValid = false;
        }

        if( this.state.password.length < 8){
            errors["Password"] = 'Minimum 8 characters';
            isValid = false;
        }

        if(this.state.conPassword !== this.state.password){
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
            <div className="div7">
                <div className="navBar02">
                    <div style={{float: 'right', margin: '0 50px 0 0'}}><button onClick={this.logout} onSubmit={this.logout}>Log Out</button></div>
                    <div style={{float: 'right', margin: '0 50px 0 0'}}>{this.state.student.fullName}</div>
                    <div style={{float: 'right', margin: '0 50px 0 0'}}>{this.state.sessionEmail} </div>

                </div>
                <div className="div8">

                        <div style={{margin: '1px 1px 0 0px', backgroundColor: '#99ff99', color: 'black', padding: '10px 0 10px 10px'}}>
                            <h4 style={{textAlign: 'center'}}>STUDENT PROFILE</h4>
                        </div>
                    <div className="div10">
                        <div>
                            <img src={userProfile} alt="..." className="img01" />
                            <div className="txt01" style={{color: '#999999', borderBottom: 'green solid 1px'}}> Student Member </div>
                            <div className="txt01" style={{color: 'black', borderLeft: 'green solid 1px'}}> {this.state.student.fullName} </div>
                        </div>
                    </div>
                    <div className="div11">
                        <div className="txt02" style={{color: '#808080'}}> Email </div>
                        <div className="txt03" style={{color: 'black'}}> {this.state.student.email} </div>
                        <div className="txt02" style={{color: '#808080'}}> Phone </div>
                        <div className="txt03" style={{color: 'black'}}> {this.state.student.contactNum} </div>

                        <Link to={'/api/student/edit/' + this.state.student.email} ><button style={{margin: '25px 10px 0 0', float: 'right'}}>Edit Profile</button> </Link>
                    </div>

                </div>

            </div>

        )
    }
}