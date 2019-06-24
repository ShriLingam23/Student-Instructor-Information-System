import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import {BASE_URL} from '../../..';
import InstructorNotifications from "./InstructorNotifications";
// const BASE_URL = 'http://localhost:4000/';

export default class ViewAcceptedCourses extends Component {
    constructor(props) {
        super(props);

        this.state = {
            courses: [],
            enable_computing: false,
            enable_engineering: false,
            enable_business: false,
            enable_science: false
        }
    }

    componentDidMount() {
        axios.get(BASE_URL + 'staffs/' + sessionStorage.getItem('userId') + '/courses')
            .then(response => {
                this.setState({
                    courses: response.data.data.courses,
                });
                console.log(response.data.data.courses);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidUpdate() {
        axios.get(BASE_URL + 'staffs/' + sessionStorage.getItem('userId') + '/courses')
            .then(response => {
                this.setState({
                    courses: response.data.data.courses,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onClickComputing = () => {
        this.setState({
            enable_computing: true,
            enable_engineering: false,
            enable_business: false,
            enable_science: false
        });
    };

    onClickEngineering = () => {
        this.setState({
            enable_computing: false,
            enable_engineering: true,
            enable_business: false,
            enable_science: false
        });
    };

    onClickBusiness = () => {
        this.setState({
            enable_computing: false,
            enable_engineering: false,
            enable_business: true,
            enable_science: false
        });
    };

    onClickScience = () => {
        this.setState({
            enable_computing: false,
            enable_engineering: false,
            enable_business: false,
            enable_science: true
        });
    };

    render() {
        return (
            <div className="list-group">
                <br/>
                <InstructorNotifications/>
                <br/>
                <div className="nav nav-pills nav-fill">
                    <div className="nav-item mx-2">
                        <label className="nav-link btn-info" onClick={this.onClickComputing}>
                            <b> Computing Faculty</b>
                        </label>
                    </div>
                    <div className="nav-item mx-2">
                        <label className="nav-link btn-secondary" onClick={this.onClickEngineering}>
                            <b> Engineering Faculty</b>
                        </label>
                    </div>
                    <div className="nav-item mx-2">
                        <label className="nav-link btn-success" onClick={this.onClickBusiness}>
                            <b> Business Faculty</b>
                        </label>
                    </div>
                    <div className="nav-item mx-2">
                        <label className="nav-link btn-warning" onClick={this.onClickScience}>
                            <b> Science Faculty</b>
                        </label>
                    </div>
                </div>

                <br/>

                {
                    this.state.courses.map((course, i) => {
                        if (course.faculty === 'Computing Faculty' && this.state.enable_computing === true) {
                            if (course.year === 1) {
                                return (
                                    <div>
                                        <div className="card" key={i}>
                                            <div className="card-header">
                                                <h4>Year 1</h4>
                                            </div>
                                            <div className="card-body">
                                                <Link to={"/courses/" + course._id}
                                                      className="list-group-item list-group-item-action bg-light">
                                                    <div className="d-flex w-100 justify-content-between">
                                                        <h5 className="mb-1">{course.courseName}</h5>
                                                        <small className="text-muted">Code : {course.courseId}</small>
                                                    </div>
                                                    <small className="text-muted">Semester : {course.semester}</small>
                                                </Link>
                                            </div>
                                        </div>
                                        <br/>
                                    </div>
                                )
                            } else if (course.year === 2) {
                                return (
                                    <div>
                                        <div className="card" key={i}>
                                            <div className="card-header">
                                                <h4>Year 2</h4>
                                            </div>
                                            <div className="card-body">
                                                <Link to={"/courses/" + course._id}
                                                      className="list-group-item list-group-item-action bg-light">
                                                    <div className="d-flex w-100 justify-content-between">
                                                        <h5 className="mb-1">{course.courseName}</h5>
                                                        <small className="text-muted">Code : {course.courseId}</small>
                                                    </div>
                                                    <small className="text-muted">Semester : {course.semester}</small>
                                                </Link>
                                            </div>
                                        </div>
                                        <br/>
                                    </div>
                                )
                            } else if (course.year === 3) {
                                return (
                                    <div>
                                        <div className="card" key={i}>
                                            <div className="card-header">
                                                <h4>Year 3</h4>
                                            </div>
                                            <div className="card-body">
                                                <Link to={"/courses/" + course._id}
                                                      className="list-group-item list-group-item-action bg-light">
                                                    <div className="d-flex w-100 justify-content-between">
                                                        <h5 className="mb-1">{course.courseName}</h5>
                                                        <small className="text-muted">Code : {course.courseId}</small>
                                                    </div>
                                                    <small className="text-muted">Semester : {course.semester}</small>
                                                </Link>
                                            </div>
                                        </div>
                                        <br/>
                                    </div>
                                )
                            } else if (course.year === 4) {
                                return (
                                    <div>
                                        <div className="card" key={i}>
                                            <div className="card-header">
                                                <h4>Year 4</h4>
                                            </div>
                                            <div className="card-body">
                                                <Link to={"/courses/" + course._id}
                                                      className="list-group-item list-group-item-action bg-light">
                                                    <div className="d-flex w-100 justify-content-between">
                                                        <h5 className="mb-1">{course.courseName}</h5>
                                                        <small className="text-muted">Code : {course.courseId}</small>
                                                    </div>
                                                    <small className="text-muted">Semester : {course.semester}</small>
                                                </Link>
                                            </div>
                                        </div>
                                        <br/>
                                    </div>
                                )
                            }
                        } else if (course.faculty === 'Engineering Faculty' && this.state.enable_engineering === true) {
                            if (course.year === 1) {
                                return (
                                    <div>
                                        <div className="card" key={i}>
                                            <div className="card-header">
                                                <h4>Year 1</h4>
                                            </div>
                                            <div className="card-body">
                                                <Link to={"/courses/" + course._id}
                                                      className="list-group-item list-group-item-action bg-light">
                                                    <div className="d-flex w-100 justify-content-between">
                                                        <h5 className="mb-1">{course.courseName}</h5>
                                                        <small className="text-muted">Code : {course.courseId}</small>
                                                    </div>
                                                    <small className="text-muted">Semester : {course.semester}</small>
                                                </Link>
                                            </div>
                                        </div>
                                        <br/>
                                    </div>
                                )
                            } else if (course.year === 2) {
                                return (
                                    <div>
                                        <div className="card" key={i}>
                                            <div className="card-header">
                                                <h4>Year 2</h4>
                                            </div>
                                            <div className="card-body">
                                                <Link to={"/courses/" + course._id}
                                                      className="list-group-item list-group-item-action bg-light">
                                                    <div className="d-flex w-100 justify-content-between">
                                                        <h5 className="mb-1">{course.courseName}</h5>
                                                        <small className="text-muted">Code : {course.courseId}</small>
                                                    </div>
                                                    <small className="text-muted">Semester : {course.semester}</small>
                                                </Link>
                                            </div>
                                        </div>
                                        <br/>
                                    </div>
                                )
                            } else if (course.year === 3) {
                                return (
                                    <div>
                                        <div className="card" key={i}>
                                            <div className="card-header">
                                                <h4>Year 3</h4>
                                            </div>
                                            <div className="card-body">
                                                <Link to={"/courses/" + course._id}
                                                      className="list-group-item list-group-item-action bg-light">
                                                    <div className="d-flex w-100 justify-content-between">
                                                        <h5 className="mb-1">{course.courseName}</h5>
                                                        <small className="text-muted">Code : {course.courseId}</small>
                                                    </div>
                                                    <small className="text-muted">Semester : {course.semester}</small>
                                                </Link>
                                            </div>
                                        </div>
                                        <br/>
                                    </div>
                                )
                            } else if (course.year === 4) {
                                return (
                                    <div>
                                        <div className="card" key={i}>
                                            <div className="card-header">
                                                <h4>Year 4</h4>
                                            </div>
                                            <div className="card-body">
                                                <Link to={"/courses/" + course._id}
                                                      className="list-group-item list-group-item-action bg-light">
                                                    <div className="d-flex w-100 justify-content-between">
                                                        <h5 className="mb-1">{course.courseName}</h5>
                                                        <small className="text-muted">Code : {course.courseId}</small>
                                                    </div>
                                                    <small className="text-muted">Semester : {course.semester}</small>
                                                </Link>
                                            </div>
                                        </div>
                                        <br/>
                                    </div>
                                )
                            }
                        } else if (course.faculty === 'Business Faculty' &&this.state.enable_business === true) {
                            if (course.year === 1) {
                                return (
                                    <div>
                                        <div className="card" key={i}>
                                            <div className="card-header">
                                                <h4>Year 1</h4>
                                            </div>
                                            <div className="card-body">
                                                <Link to={"/courses/" + course._id}
                                                      className="list-group-item list-group-item-action bg-light">
                                                    <div className="d-flex w-100 justify-content-between">
                                                        <h5 className="mb-1">{course.courseName}</h5>
                                                        <small className="text-muted">Code : {course.courseId}</small>
                                                    </div>
                                                    <small className="text-muted">Semester : {course.semester}</small>
                                                </Link>
                                            </div>
                                        </div>
                                        <br/>
                                    </div>
                                )
                            } else if (course.year === 2) {
                                return (
                                    <div>
                                        <div className="card" key={i}>
                                            <div className="card-header">
                                                <h4>Year 2</h4>
                                            </div>
                                            <div className="card-body">
                                                <Link to={"/courses/" + course._id}
                                                      className="list-group-item list-group-item-action bg-light">
                                                    <div className="d-flex w-100 justify-content-between">
                                                        <h5 className="mb-1">{course.courseName}</h5>
                                                        <small className="text-muted">Code : {course.courseId}</small>
                                                    </div>
                                                    <small className="text-muted">Semester : {course.semester}</small>
                                                </Link>
                                            </div>
                                        </div>
                                        <br/>
                                    </div>
                                )
                            } else if (course.year === 3) {
                                return (
                                    <div>
                                        <div className="card" key={i}>
                                            <div className="card-header">
                                                <h4>Year 3</h4>
                                            </div>
                                            <div className="card-body">
                                                <Link to={"/courses/" + course._id}
                                                      className="list-group-item list-group-item-action bg-light">
                                                    <div className="d-flex w-100 justify-content-between">
                                                        <h5 className="mb-1">{course.courseName}</h5>
                                                        <small className="text-muted">Code : {course.courseId}</small>
                                                    </div>
                                                    <small className="text-muted">Semester : {course.semester}</small>
                                                </Link>
                                            </div>
                                        </div>
                                        <br/>
                                    </div>
                                )
                            } else if (course.year === 4) {
                                return (
                                    <div>
                                        <div className="card" key={i}>
                                            <div className="card-header">
                                                <h4>Year 4</h4>
                                            </div>
                                            <div className="card-body">
                                                <Link to={"/courses/" + course._id}
                                                      className="list-group-item list-group-item-action bg-light">
                                                    <div className="d-flex w-100 justify-content-between">
                                                        <h5 className="mb-1">{course.courseName}</h5>
                                                        <small className="text-muted">Code : {course.courseId}</small>
                                                    </div>
                                                    <small className="text-muted">Semester : {course.semester}</small>
                                                </Link>
                                            </div>
                                        </div>
                                        <br/>
                                    </div>
                                )
                            }
                        } else if (course.faculty === 'Science Faculty' && this.state.enable_science === true) {
                            if (course.year === 1) {
                                return (
                                    <div>
                                        <div className="card" key={i}>
                                            <div className="card-header">
                                                <h4>Year 1</h4>
                                            </div>
                                            <div className="card-body">
                                                <Link to={"/courses/" + course._id}
                                                      className="list-group-item list-group-item-action bg-light">
                                                    <div className="d-flex w-100 justify-content-between">
                                                        <h5 className="mb-1">{course.courseName}</h5>
                                                        <small className="text-muted">Code : {course.courseId}</small>
                                                    </div>
                                                    <small className="text-muted">Semester : {course.semester}</small>
                                                </Link>
                                            </div>
                                        </div>
                                        <br/>
                                    </div>
                                )
                            } else if (course.year === 2) {
                                return (
                                    <div>
                                        <div className="card" key={i}>
                                            <div className="card-header">
                                                <h4>Year 2</h4>
                                            </div>
                                            <div className="card-body">
                                                <Link to={"/courses/" + course._id}
                                                      className="list-group-item list-group-item-action bg-light">
                                                    <div className="d-flex w-100 justify-content-between">
                                                        <h5 className="mb-1">{course.courseName}</h5>
                                                        <small className="text-muted">Code : {course.courseId}</small>
                                                    </div>
                                                    <small className="text-muted">Semester : {course.semester}</small>
                                                </Link>
                                            </div>
                                        </div>
                                        <br/>
                                    </div>
                                )
                            } else if (course.year === 3) {
                                return (
                                    <div>
                                        <div className="card" key={i}>
                                            <div className="card-header">
                                                <h4>Year 3</h4>
                                            </div>
                                            <div className="card-body">
                                                <Link to={"/courses/" + course._id}
                                                      className="list-group-item list-group-item-action bg-light">
                                                    <div className="d-flex w-100 justify-content-between">
                                                        <h5 className="mb-1">{course.courseName}</h5>
                                                        <small className="text-muted">Code : {course.courseId}</small>
                                                    </div>
                                                    <small className="text-muted">Semester : {course.semester}</small>
                                                </Link>
                                            </div>
                                        </div>
                                        <br/>
                                    </div>
                                )
                            } else if (course.year === 4) {
                                return (
                                    <div>
                                        <div className="card" key={i}>
                                            <div className="card-header">
                                                <h4>Year 4</h4>
                                            </div>
                                            <div className="card-body">
                                                <Link to={"/courses/" + course._id}
                                                      className="list-group-item list-group-item-action bg-light">
                                                    <div className="d-flex w-100 justify-content-between">
                                                        <h5 className="mb-1">{course.courseName}</h5>
                                                        <small className="text-muted">Code : {course.courseId}</small>
                                                    </div>
                                                    <small className="text-muted">Semester : {course.semester}</small>
                                                </Link>
                                            </div>
                                        </div>
                                        <br/>
                                    </div>
                                )
                            }
                        }
                    })
                }
            </div>
        );
    }
}