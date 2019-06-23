import React, {Component} from 'react';
import '../../../assets/styles/user.css';
import {Link} from "react-router-dom";


export default class nav_bar extends Component{

    render() {
        return(
            <div className="d9">
                <div style={{margin: '20px 1px 10px 25px', float: 'left'}}><h2>Students Instructors Information System</h2></div>

                <div style={{float: 'right', margin: '35px 20px 10px 1px', color: 'white'}}>
                    <Link to="/"> <div style={{color: 'white', float: 'right', margin: '0 15px 0 1px'}}> About Us </div> </Link>
                    <Link to="/"> <div style={{color: 'white', float: 'right', margin: '0 15px 0 1px'}}> Contact </div> </Link>
                    <Link to="/"> <div style={{color: 'white', float: 'right', margin: '0 15px 0 1px'}}> Home </div> </Link>
                </div>
            </div>
        )
    }


}