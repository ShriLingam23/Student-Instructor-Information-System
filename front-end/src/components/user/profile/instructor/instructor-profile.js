import React, {Component} from 'react';
import {Link} from "react-router-dom";
import '../../assets/styles/user.css';
import axios from 'axios';
import userProfile from '../../assets/images/userProfile.jpg';


export default class instructorProfile extends Component{

    constructor(props){
        super(props);

        console.log(this.props.match.params.id);
        const sessionEmail = sessionStorage.getItem('email');
        const sessionUserType = sessionStorage.getItem('userType');
        console.log(sessionUserType);

        if(sessionEmail === null || sessionUserType !== 'staff'){
            console.log('in session checking');
            window.location.assign('/');
        }else{
            console.log('session validated');
        }

        this.logout = this.logout.bind(this);

        this.state = {
            sessionEmail: sessionStorage.getItem('email'),
            staff: []
        };

    }

    componentDidMount() {
        console.log(this.props.match.params.id);
        const email = {
            email: this.props.match.params.id
        };

        axios.post('http://localhost:4000/api/staff/profile', email)
            .then(response => {
                this.setState({
                    staff: response.data
                });
                console.log(this.state.staff);
                console.log('get');
            })
            .catch(err => {
                console.log(err);
            })
    }

    logout(e){
        e.preventDefault();
        console.log('this is logout');

        sessionStorage.removeItem('email');
        sessionStorage.removeItem('userType');

        window.location.assign('/');
    }

    render() {
        return (
            <div className="div7">
                <div className="navBar02">
                    <div style={{float: 'right', margin: '0 50px 0 0'}}><button onClick={this.logout}>Log Out</button></div>
                    <div style={{float: 'right', margin: '0 50px 0 0'}}> {this.state.staff.fullName} </div>
                    <div style={{float: 'right', margin: '0 50px 0 0'}}> {this.state.sessionEmail} </div>

                </div>
                <div className="div12">

                    <div style={{margin: '1px 1px 0 0px', backgroundColor: '#ff99dd', color: 'black', padding: '10px 0 10px 10px'}}>
                        <h4 style={{textAlign: 'center'}}>INSTRUCTOR PROFILE</h4>
                    </div>
                    <div className="div10">
                        <div>
                            <img src={userProfile} alt="..." className="img01" />
                            <div className="txt01" style={{color: '#999999', borderBottom: 'green solid 1px'}}> Instructor Member </div>
                            <div className="txt01" style={{color: 'black', borderLeft: 'green solid 1px'}}> {this.state.staff.fullName} </div>
                        </div>
                    </div>
                    <div className="div11">
                        <div className="txt02" style={{color: '#808080'}}> Phone </div>
                        <div className="txt03" style={{color: 'black'}}> {this.state.staff.contactNum} </div>
                        <div className="txt02" style={{color: '#808080'}}> Campus </div>
                        <div className="txt03" style={{color: 'black'}}> {this.state.staff.location} </div>
                        <div className="txt02" style={{color: '#808080'}}> Email </div>
                        <div className="txt03" style={{color: 'black'}}> {this.state.staff.email} </div>
                    </div>

                </div>
                <div className="div13">
                    <div style={{margin: '1px 1px 0 0px', backgroundColor: '#ff99dd', color: 'black', padding: '10px 0 10px 10px'}}>
                        <h4 style={{textAlign: 'center'}}>INSTRUCTOR</h4>
                    </div>
                    {/*<Link to='/api/instructor/register/'>
                        <div className="txt04" style={{color: '#b30086', borderBottom: 'green solid 0px'}}>-> Add New Instructor </div>
                    </Link>*/}
                </div>

            </div>

        )
    }
}