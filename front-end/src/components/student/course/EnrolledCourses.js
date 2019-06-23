import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import StudentNotification from "../submission/StudentNotification";

const BASE_URL = 'http://localhost:4000/';

export default class studentCourse extends Component {
    constructor(props) {
        super(props);

        this.state = {
            courses: []
        }
    }

    componentDidMount() {
        axios.get(BASE_URL + 'courses/')
            .then(response => {
                this.setState({
                    courses: response.data.data,
                });
            })
            .catch(function (error) {
                Swal.fire('Oops...', ' Course Data Not Found', 'error');
                console.log(error);
            });
    }

    render() {
        return (
            <div><br/><br/>
                <StudentNotification/>
            <ul>
            {
                this.state.courses.map((coures, i) => {
                    return (
                        <li key={i} className="navbar-item">
                        <Link to={"/courses/" + coures._id} className="nav-link">{coures.name}</Link>
                        </li>
                )
                })
            }

            </ul>
            </div>
    );
    }
}