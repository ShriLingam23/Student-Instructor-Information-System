import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import {BASE_URL} from '../../..';
import InstructorNotifications from "../InstructorNotifications";
// const BASE_URL = 'http://localhost:4000/';

export default class ViewAcceptedCourses extends Component {
    constructor(props) {
        super(props);

        this.state = {
            courses: []
        }
    }

    componentDidMount() {
        axios.get(BASE_URL + 'instructors/' + sessionStorage.getItem('userId') + '/courses')
            .then(response => {
                this.setState({
                    courses: response.data.data.courses,
                });
                console.log(response.data.data.courses);
            })
            .catch(function (error) {
                Swal.fire('Oops...', ' Course Data Not Found', 'error');
                console.log(error);
            });
    }

    componentDidUpdate() {
        axios.get(BASE_URL + 'instructors/' + sessionStorage.getItem('userId') + '/courses')
            .then(response => {
                this.setState({
                    courses: response.data.data.courses,
                });
            })
            .catch(function (error) {
                Swal.fire('Oops...', ' Course Data Not Found', 'error');
                console.log(error);
            });
    }

    render() {
        return (
            <div className="list-group">
                <InstructorNotifications/>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <Link className="nav-link active" to="/">Active</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Active</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Active</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Active</Link>
                    </li>
                </ul>
                <br/>
                {
                    this.state.courses.map((course, i) => {
                        return (
                            <div key={i}>
                                <Link to={"/courses/" + course._id}
                                      className="list-group-item list-group-item-action">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">{course.courseName}</h5>
                                        <small className="text-muted">Code : {course.courseId}</small>
                                    </div>
                                    <small className="text-muted">Faculty : {course.faculty}</small>
                                </Link>
                                <br/>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}