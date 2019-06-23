import React, {Component} from 'react';
import '../../assets/styles/user.css';
import axios from 'axios';

export default class Register extends Component{

    constructor(props){
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

    onChangeFullName(e){
        this.setState({
            fullName: e.target.value
        });
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

    onSubmit = e => {
        e.preventDefault();

        if(this.validate()){
            console.log('submitted');
            console.log(this.state);

            const newStudent = {
                fullName: this.state.fullName,
                email: this.state.email,
                contactNum: this.state.phone,
                password: this.state.password
            };

            axios.post('http://localhost:4000/api/student/', newStudent)
                .then(res => {
                    console.log(res.data);
                    console.log('successfully added new student');

                    sessionStorage.setItem('email', res.data.email);
                    sessionStorage.setItem('userType', 'student');

                    window.location.assign('/api/student/' + res.data.email);
                })
                .catch(err =>{
                   console.log(err);
                   alert('the user is already exist');
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
        }
        else{
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
            <div className="div1">
                <div className="div2">

                    <div style={{border: '#99ff99 solid 2px'}}>
                        <div style={{margin: '1px 1px 15px 0px', backgroundColor: '#99ff99', color: 'black', padding: '10px 0 10px 110px'}}>
                            <h4>STUDENT REGISTRATION</h4></div>
                        <form onSubmit={this.onSubmit}>
                            <div className="div6">
                                {/*<label className="label1">Full Name</label><br/>*/}
                                <input className="field02" type="text" placeholder="Enter your name"
                                       value={this.state.fullName} onChange={this.onChangeFullName} required="true" /><br/>
                                {   this.state.fullName === '' &&
                                <div style={{fontSize: 'small', float: 'right', color: 'green', margin: '0 0 0 0'}}>The name field is empty</div>}
                                {
                                    !this.state.fullName.match(/^[a-zA-Z ]*$/) &&
                                    <div style={{fontSize: 'small', float: 'right', color: 'red', margin: '0 10px 0 0'}}>Enter Only Alphabet Characters Only</div>
                                }
                            </div>

                            <div className="div6">
                                {/*<label className="label1">Email</label><br/>*/}
                                <input className="field02" type="email" placeholder="Email"
                                       value={this.state.email} onChange={this.onChangeEmail} required={true} /><br/>
                                {   this.state.email === '' &&
                                <div style={{fontSize: 'small', float: 'right', color: 'green', margin: '0 10px 0 0'}}>The email field is empty</div>}
                            </div>
                            <div className="div6">
                                {/*<label className="label1">Contact</label><br/>*/}
                                <input className="field02" type="text" placeholder="Phone Number: eg-07********"
                                       value={this.state.phone} onChange={this.onChangePhone} required={true}/><br/>
                                {   this.state.phone === '' &&
                                <div style={{fontSize: 'small', float: 'right', color: 'green', margin: '0 10px 0 0'}}>The name field is empty</div>}
                                {
                                    !this.state.phone.match(/^[0-9+ ]*$/) && this.state.phone !== '' &&
                                    <div style={{fontSize: 'small', float: 'right', color: 'red', margin: '0 10px 0 0'}}>use Only number Characters and '+' Only</div>
                                }
                                {
                                    this.state.phone.length < 9 && this.state.phone !== '' &&
                                    <div style={{fontSize: 'small', float: 'right', color: 'red', margin: '0 10px 0 0'}}>Minimum 9 numbers.</div>
                                }
                            </div>
                            <div className="div6">
                                {/*<label className="label1">Password</label><br/>*/}
                                <input className="field02" type="password" placeholder="Password"
                                       value={this.state.password} onChange={this.onChangePassword} required={true} /><br/>
                                {   this.state.password === '' &&
                                <div style={{fontSize: 'small', float: 'right', color: 'green', margin: '0 10px 0 0'}}>The password field is empty</div>}
                                {
                                    (this.state.password.length < 8)  && this.state.password !== '' &&
                                    <div style={{fontSize: 'small', float: 'right', color: 'red', margin: '0 10px 0 0'}}>Enter more than 8 characters</div>
                                }
                            </div>
                            <div className="div6">
                                {/*<label className="label1">Confirm Password</label><br/>*/}
                                <input className="field02" type="password" placeholder="re-type password"
                                       value={this.state.conPassword} onChange={this.onChangeConPassword} required={true} /><br/>
                                {   this.state.conPassword === '' &&
                                <div style={{fontSize: 'small', float: 'right', color: 'green', margin: '0 0 0 0'}}>The confirm password field is empty</div>}
                                {
                                    (this.state.password !== this.state.conPassword)  && this.state.conPassword !== '' &&
                                    <div style={{fontSize: 'small', float: 'right', color: 'red', margin: '0 0 0 0'}}>Not matching with password</div>
                                }
                            </div>
                            <div > <input className="btn02" type="submit" value="Sign Up" /> </div>
                        </form>
                    </div>


                </div>

            </div>

        )
    }
}