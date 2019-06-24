import React, {Component} from 'react';
import '../../assets/styles/user.css';
import axios from 'axios';
import userProfile from '../../assets/images/userProfile.jpg';


export default class studentEdit extends Component{

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

        //console.log(this.props.match.params.id);

        this.onChangeConPassword = this.onChangeConPassword.bind(this);
        this.onChangeFullName = this.onChangeFullName.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);

        this.state = {
            sessionEmail: sessionStorage.getItem('email'),
            fullName: '',
            email: '',
            phone: '',
            error: {},
            student: []
        };

    }

    componentDidMount() {
        //console.log(this.props.match.params.id);
        const email = {
            email: this.props.match.params.id
        };

        axios.post('http://localhost:4000/api/student/profile', email)
            .then(response => {
                this.setState({
                    student: response.data
                });
                //console.log(this.state.student);
                this.setState({
                   fullName: this.state.student.fullName,
                   email: this.state.student.email,
                   phone: this.state.student.contactNum,

                });

                //console.log('get');
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
        console.log(this.state);
        if(this.validate()){
            console.log('submitted');
            console.log(this.state);

            const newStudent = {
                fullName: this.state.fullName,
                email: this.state.email,
                contactNum: this.state.phone,
            };

            console.log(newStudent);

            axios.put('http://localhost:4000/api/student', newStudent)
                .then(res => {
                    console.log(res.data);
                    console.log('successfully updated new student');
                    window.location.assign('/api/student/' + this.state.email);
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

    logout(e){
        e.preventDefault();
        console.log('this is logout');

        sessionStorage.removeItem('email');
        sessionStorage.removeItem('userType');

        window.location.assign('/');
    }

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
                        <h4 style={{textAlign: 'center'}}>STUDENT EDIT PROFILE</h4>
                    </div>
                    <div className="div10">
                        <div>
                            <img src={userProfile} alt="..." className="img01" />
                            <div className="txt01" style={{color: '#999999', borderBottom: 'green solid 1px'}}> Student Member </div>
                            <div className="txt01" style={{color: 'red', borderLeft: 'green solid 1px'}}> EDITING PROFILE </div>
                        </div>
                    </div>
                    <div className="div11">
                        <form onSubmit={this.onSubmit}>
                            {/*Registration ID*/}
                        <div style={{height: '65px'}}>
                        <div className="txt02" style={{color: '#808080', margin: '10px 0 0 5px'}}> Email </div>
                        <div className="txt03" style={{color: 'black', borderColor: 'red', margin: '10px 0 0 15px'}}> {this.state.student.email} </div>
                        </div>
                            {/*Full Name*/}
                            <div style={{height: '65px'}}>
                        <div className="txt02" style={{color: '#808080', margin: '10px 0 0 5px'}}> Full Name </div>
                        <div className="txt03" style={{color: 'black', borderColor: 'green', borderWidth: '2px', margin: '10px 0 0 15px'}}>
                            <input style={{borderWidth: '0px'}} type="text" value={this.state.fullName} onChange={this.onChangeFullName} /> </div>
                            {   this.state.fullName === '' &&
                            <div style={{fontSize: 'small', float: 'right', color: 'green', margin: '0 10px 0 0'}}>The name field is empty</div>}
                            {
                                !this.state.fullName.match(/^[a-zA-Z ]*$/) &&
                                <div style={{fontSize: 'small', float: 'right', color: 'red', margin: '0 10px 0 0'}}>Enter Only Alphabet Characters Only</div>
                            }
                            </div>

                            {/* Phone Number*/}
                            <div style={{height: '65px'}}>
                        <div className="txt02" style={{color: '#808080', margin: '10px 0 0 5px'}}> Phone </div>
                        <div className="txt03" style={{color: 'black', borderColor: 'green', borderWidth: '2px', margin: '10px 0 0 15px'}}>
                            <input style={{borderWidth: '0px'}} type="text" value={this.state.phone} onChange={this.onChangePhone} /> </div>
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


                            {/*Submit Button*/}
                        <input style={{margin: '25px 10px 0 0', float: 'right'}} type="submit" value="Update" />
                        </form>
                    </div>

                </div>

            </div>

        )
    }
}