import React, {Component} from 'react';
import '../../assets/styles/user.css';
import axios from 'axios';

export default class RegisterIn extends Component{

    constructor(props){
        super(props);

        this.onChangeCampus = this.onChangeCampus.bind(this);
        this.onChangeConPassword = this.onChangeConPassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeFullName = this.onChangeFullName.bind(this);
        this.onChangeID = this.onChangeID.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeRank = this.onChangeRank.bind(this);
        this.onChangeDepartment = this.onChangeDepartment.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);

        this.state = {
            fullName: '',
            regId: '',
            email: '',
            phone: '',
            campus: 'Malabe',
            department: 'IT',
            rank: 'Instructor',
            password: '',
            conPassword: '',
            error: {}
        };

    }

    onChangeFullName(e){
        e.preventDefault();
        this.setState({
            fullName: e.target.value
        });
    }

    onChangeID(e){
        e.preventDefault();
        this.setState({
            regId: e.target.value
        })
    }

    onChangeEmail(e){
        e.preventDefault();
        this.setState({
            email: e.target.value
        })
    }

    onChangePhone(e){
        e.preventDefault();
        this.setState({
            phone: e.target.value
        })
    }

    onChangeCampus(e){
        e.preventDefault();
        this.setState({
            campus: e.target.value
        });

    }

    onChangeDepartment(e){
        e.preventDefault();
        this.setState({
            department: e.target.value
        });

    }

    onChangeRank(e){
        e.preventDefault();
        this.setState({
            rank: e.target.value
        });

    }

    onChangePassword(e){
        e.preventDefault();
        this.setState({
            password: e.target.value
        })
    }

    onChangeConPassword(e){
        e.preventDefault();
        this.setState({
            conPassword: e.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault();

        if(this.validate()){
            console.log('submitted');
            //console.log(this.state);

            const newInstr = {
                full_name: this.state.fullName,
                registration_id: this.state.regId,
                email: this.state.email,
                phone: this.state.phone,
                campus: this.state.campus,
                rank: this.state.rank,
                department: this.state.department,
                password: this.state.password
            };

            console.log(newInstr);

           axios.post('http://localhost:4000/api/instructor/', newInstr)
                .then(res => {
                    console.log(res.data);
                    console.log('successfully added new student');
                    //window.location.assign('/api/instructor/' + res.data._id);
                    this.setState({
                        fullName: '',
                        regId: '',
                        email: '',
                        phone: '',
                        password: '',
                        conPassword: ''
                    })

                })
                .catch(err =>{
                    console.log(err);
                    alert('the user is already exist');
                });
            /*
            this.setState({
                fullName: '',
                regId: '',
                email: '',
                phone: '',
                campus: '',
                password: '',
                conPassword: ''
            }) */
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
            <div className="div1" style={{height: '800px', backgroundSize: '1350px 800px'}}>
                <div className="navBar02">sss</div>
                <div className="div2" style={{height: '738px'}}>

                    <div style={{border: '#99ff99 solid 2px'}}>
                        <div style={{margin: '1px 1px 15px 0px', backgroundColor: '#99ff99', color: 'black', padding: '10px 0 10px 110px'}}>
                            <h4>Add New Instructor</h4></div>
                        <form onSubmit={this.onSubmit}>
                            <div className="div6">
                                {/*<label className="label1">Full Name</label><br/>*/}
                                <input className="field02" type="text" placeholder="Instructor Name"
                                       value={this.state.fullName} onChange={this.onChangeFullName} required="true" /><br/>
                                {   this.state.fullName === '' &&
                                <div style={{fontSize: 'small', float: 'right', color: 'green', margin: '0 0 0 0'}}>The name field is empty</div>}
                                {
                                    !this.state.fullName.match(/^[a-zA-Z ]*$/) &&
                                    <div style={{fontSize: 'small', float: 'right', color: 'red', margin: '0 10px 0 0'}}>Enter Only Alphabet Characters Only</div>
                                }
                            </div>
                            <div className="div6">
                                {/*<label className="label1">Registration Number</label><br/>*/}
                                <input className="field02" type="text" placeholder="Instructor Registation Number"
                                       value={this.state.stId} onChange={this.onChangeID} required={true} /><br/>
                                {   this.state.stId === '' &&
                                <div style={{fontSize: 'small', float: 'right', color: 'green', margin: '0 10px 0 0'}}>The ID field is empty</div>}
                                {
                                    !this.state.regId.match(/^[a-zA-Z0-9 ]*$/) &&
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
                                <input className="field02" type="text" placeholder="Phone Number"
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
                                <label className="label1" style={{fontSize: 'Large'}}>Campus</label>
                                <select className="select1" onChange={this.onChangeCampus} >
                                    <option value="Malabe">Malabe</option>
                                    <option value="Matara">Matara</option>
                                    <option value="Kandy">Kandy</option>
                                    <option value="Jaffna">Jaffna</option>
                                    <option value="Metro">Metro</option>
                                </select>
                            </div>
                            <div className="div6" style={{textAlign: 'center'}}>
                                <label className="label1" style={{fontSize: 'Large'}}>Department</label>
                                <select className="select1" style={{width: '275px', textAlign: 'center'}} onChange={this.onChangeDepartment} >
                                    <option value="IT" >Information Technology</option>
                                    <option value="BM">Business Management</option>
                                </select>
                            </div>
                            <div className="div6">
                                <label className="label1" style={{fontSize: 'Large'}}>Rank</label>
                                <select className="select1" onChange={this.onChangeRank} >
                                    <option value="Instructor">Instructor</option>
                                    <option value="Assistant Lecturer">Assistant Lecturer</option>
                                    <option value="Lecturer">Lecturer</option>
                                    <option value="Senior Lecturer">Senior Lecturer</option>
                                </select>
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
                            <div > <input className="btn02" type="submit" value="Add Instructor" /> </div>
                        </form>
                    </div>


                </div>

            </div>

        )
    }
}