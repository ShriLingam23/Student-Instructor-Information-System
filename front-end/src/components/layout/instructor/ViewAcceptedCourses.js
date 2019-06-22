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
                <br/>
                {
                    this.state.courses.map((course, i) => {
                        return (
                            <div key={i}>
                                <Link to={"/courses/" + course._id}
                                      className="list-group-item list-group-item-action">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">{course.name}</h5>
                                        <small className="text-muted">Code :</small>
                                    </div>
                                    <p className="mb-1">Donec id elit non mi porta gravida at eget metus.
                                        Maecenas sed diam eget risus varius blandit.</p>
                                    <small className="text-muted">Donec id elit non mi porta.</small>
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