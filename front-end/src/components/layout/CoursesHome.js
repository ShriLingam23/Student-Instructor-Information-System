import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const BASE_URL = 'http://localhost:4000/';

export default class CoursesHome extends Component {
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

    render() {
        return (
            <div><br/>
                <ul>
                    {
                        this.state.courses.map((course, i) => {
                            return (
                                <li key={i} className="navbar-item">
                                    <Link to={"/courses/" + course._id} className="nav-link">{course.name}</Link>
                                </li>
                            )
                        })
                    }

                </ul>
            </div>
        );
    }
}