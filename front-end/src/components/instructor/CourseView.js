import React, {Component} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {Link} from "react-router-dom";
import $ from "jquery";
import IconJoiner from "../../utils/icon-selector.component";
import AddAssignment from "./AddAssignment";

const BASE_URL = 'http://localhost:4000/';

const LinkView = ({assignment, deleteMaterial}) => (
    <li className="list-group-item">
        <Link to={'/assignment-view/' + assignment._id}>
            <label className="d-inline">
                <IconJoiner type="assignment" ext={assignment.file_type}/>
                <label className="alert-link">{"---" + assignment.link_name}</label>
            </label>
        </Link>
        <input type="button" id="delete_material" value="Delete" onClick={() => {
            deleteMaterial(assignment._id)
        }} className="btn btn-dark float-right d-inline"/>
    </li>
);

export default class CourseView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            assignments: [],
            file_name: '',
            file_url: '',
            file_ext: '',
            file_type: '',
            enable_add_assignment: false
        };
    }

    componentDidMount() {
        $(document).ready(function () {
            $("#reset").click(function () {
                $("#input_File").siblings(".custom-file-label").addClass("selected").html('');
            });
        });

        axios.get(BASE_URL + 'assignments/')
            .then(response => {
                this.setState({
                    assignments: response.data.data,
                });
            })
            .catch(function (error) {
                Swal.fire('Oops...', ' Assignments Data Not Found', 'error');
                console.log(error);
            });
    }

    componentDidUpdate() {
        axios.get(BASE_URL + 'assignments/')
            .then(response => {
                this.setState({
                    assignments: response.data.data,
                });
            })
            .catch(function (error) {
                Swal.fire('Oops...', ' Assignments Data Not Found', 'error');
                console.log(error);
            });
    }


    onClickAssignment = () => {
        this.setState({
            enable_add_assignment: true
        });
    };

    onClickDisable = () => {
        this.setState({
            enable_add_assignment: false
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
                let assignments = this.state.assignments.find((assignment) => {
                    return assignment._id === id
                });

                let deleteFile = {
                    file_url: assignments.file_url
                };
                axios.delete(BASE_URL + 'assignments/' + id)
                    .then(() => {
                        axios.post(BASE_URL + 'assignments/delete-file', deleteFile)
                    })
            }
        })

    };

    addComponentLoader() {
        if (this.state.enable_add_assignment === true) {
            return <AddAssignment/>
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
                            this.state.assignments.map((assignment, i) => {
                                return (
                                    <LinkView deleteMaterial={this.deleteMaterial} assignment={assignment} key={i}/>
                                );
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div><br/><br/>
                <div className="nav nav-pills nav-fill">
                    <div className="nav-item mx-2">
                        <label className="nav-link btn-light" id="add_assignment_btn" onClick={this.onClickAssignment}>
                            <b>Add Assignment/Exam</b>
                        </label>
                    </div>
                    <div className="nav-item mx-2">
                        <label className="nav-link btn-info" id="add_notice_btn" onClick={this.onClickDisable}>
                            <b>Hide</b>
                        </label>
                    </div>
                </div>
                {this.addComponentLoader()}
                {this.assignmentListView()}
                <br/>
            </div>
        );
    }
};