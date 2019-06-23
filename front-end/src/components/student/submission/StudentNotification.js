import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import {BASE_URL} from '../../..';

export default class StudentNotification extends Component {
    constructor(props) {
        super(props);

        this.state = {
            assessments: []
        }
    }

    componentDidMount() {
        axios.get(BASE_URL + 'students/' + sessionStorage.getItem('userId') + '/assessments')
            .then(response => {
                this.setState({
                    assessments: response.data.data,
                });

                console.log(response.data.data);
            })
            .catch(function (error) {
                Swal.fire('Oops...', ' Assessment Data Not Found', 'error');
                console.log(error);
            });
    }

    componentDidUpdate() {
        axios.get(BASE_URL + 'students/' + sessionStorage.getItem('userId') + '/assessments')
            .then(response => {
                this.setState({
                    assessments: response.data.data.courses,
                });
            })
            .catch(function (error) {
                Swal.fire('Oops...', ' Assessment Data Not Found', 'error');
                console.log(error);
            });
    }

    render() {
        return (
            <div className="list-group">
                <br/>
                {
                    this.state.assessments.map((assessment, i) => {
                        return (
                            <div key={i}>
                                <Link to={"/assessments/" + assessment.course._id}
                                      className="list-group-item list-group-item-action">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">{assessment.course.coursName}</h5>
                                    </div>
                                    <p className="mb-1">You Have A New Assignment</p>

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