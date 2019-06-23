import React, {Component} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {Link} from "react-router-dom";
import $ from "jquery";
import IconJoiner from "../utils/icon-selector.component";
import AddAssessment from "./AddAssessment";

import {BASE_URL} from '../../../index';
// const BASE_URL = 'http://localhost:4000/';

const LinkView = ({assessment, deleteMaterial}) => (
    <li className="list-group-item">
        <Link to={'/assessments/' + assessment._id}>
            <label className="d-inline">
                <IconJoiner ext={assessment.file_type}/>
                <label className="alert-link">{"---" + assessment.link_name}</label>
            </label>
        </Link>
        <input type="button" id="delete_material" value="Delete" onClick={() => {
            deleteMaterial(assessment._id)
        }} className="btn btn-dark float-right d-inline"/>
    </li>
);

export default class ViewCourseAssessments extends Component {

    constructor(props) {
        super(props);

        this.state = {
            assessments: [],
            course: '',
            file_url: '',
            file_type: '',
            enable_add_assessment: false
        };
    }

    componentDidMount() {
        $(document).ready(function () {
            $("#reset").click(function () {
                $("#input_File").siblings(".custom-file-label").addClass("selected").html('');
            });
        });

        axios.get(BASE_URL + 'assessments/course/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    assessments: response.data.data,
                });
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get(BASE_URL + 'courses/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    course: response.data.data,
                });
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    componentDidUpdate() {
        axios.get(BASE_URL + 'assessments/course/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    assessments: response.data.data,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    onClickAssignment = () => {
        this.setState({
            enable_add_assessment: true
        });
    };

    onClickDisable = () => {
        this.setState({
            enable_add_assessment: false
        });
    };

    deleteMaterial = (id) => {

        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this file!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'

        }).then((result) => {
            if (result.value) {
                let assessments = this.state.assessments.find((assessment) => {
                    return assessment._id === id
                });

                let deleteFile = {
                    file_url: assessments.file_url
                };
                axios.delete(BASE_URL + 'assessments/' + id)
                    .then(() => {
                        axios.post(BASE_URL + 'assessments/delete-file', deleteFile)
                    })
            }
        })

    };

    addComponentLoader() {
        if (this.state.enable_add_assessment === true) {
            return <AddAssessment course={this.state.course}/>
        }
    };

    assignmentListView() {
        return (
            <div><br/>
                <div className="card">
                    <div className="card-header">
                        <b>Assignments</b>
                    </div>
                    <ul className="list-group list-group-flush">
                        {
                            this.state.assessments.map((assignment, i) => {
                                if (assignment.file_type === 'assignment')
                                    return <LinkView deleteMaterial={this.deleteMaterial} assessment={assignment} key={i}/>;
                                else
                                    return null;
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }

    examListView() {
        return (
            <div><br/>
                <div className="card">
                    <div className="card-header">
                        <b>Exams</b>
                    </div>
                    <ul className="list-group list-group-flush">
                        {
                            this.state.assessments.map((exam, i) => {
                                if (exam.file_type === 'exam')
                                    return <LinkView deleteMaterial={this.deleteMaterial} assessment={exam} key={i}/>;
                                else
                                    return null;
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div><br/>
                <h2>Course : {this.state.course.courseName}</h2><br/>
                <div className="nav nav-pills nav-fill">
                    <div className="nav-item mx-2">
                        <label className="nav-link btn-light" onClick={this.onClickAssignment}>
                            <b>Create New Assessment</b>
                        </label>
                    </div>
                    <div className="nav-item mx-2">
                        <label className="nav-link btn-info" onClick={this.onClickDisable}>
                            <b>Hide</b>
                        </label>
                    </div>
                </div>
                {this.addComponentLoader()}
                {this.assignmentListView()}
                {this.examListView()}
                <br/>
            </div>
        );
    }
};