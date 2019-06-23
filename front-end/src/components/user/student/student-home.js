import React, {Component} from 'react';
import {Link} from "react-router-dom";
import '../../assets/styles/user.css';
import axios from 'axios';
import userProfile from '../../assets/images/userProfile.jpg';


export default class studentProfile extends Component{

    constructor(props){
        super(props);

    }

    componentDidMount() {
        console.log('dddddddd');
    }

    render() {
        return (
            <div className="div7">
                <div className="div8">

                    <div style={{margin: '1px 1px 0 0px', backgroundColor: '#99ff99', color: 'black', padding: '10px 0 10px 10px'}}>
                        <h4 style={{textAlign: 'center'}}>STUDENT HOME</h4>
                    </div>

                </div>

            </div>

        )
    }
}