import React, {Component} from 'react';
import {Link} from "react-router-dom";
import moment from 'moment';
import axios from 'axios';
import IconJoiner from "../../utils/icon-selector.component";
import Swal from "sweetalert2";

const BASE_URL = 'http://localhost:4000/';

export default class ViewAssessment extends Component {

    constructor(props) {
        super(props);

        this.state = {
            assignment: '',
        };
    }

    componentDidMount() {
        axios.get(BASE_URL + 'assignments/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    assignment: response.data.data[0],
                });
            })
            .catch(err => {
                Swal.fire('Oops...', 'Assignment/Exam View Failed', 'error');
                console.log(err.message)
            });
    }

    componentDidUpdate() {
        axios.get(BASE_URL + 'assignments/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    assignment: response.data.data[0],
                });
            })
            .catch(err => {
                Swal.fire('Oops...', 'Assignment/Exam View Failed', 'error');
                console.log(err.message)
            });
    }

    getRemainingTime = (dueDateString) => {
        let currentDate = new Date();
        let dueDate = new Date(dueDateString);
        let dayDiffs = dueDate.getTime() - currentDate.getTime();

        let mins = Math.floor(dayDiffs / 60000);
        let hrs = Math.floor(mins / 60);
        let days = Math.floor(hrs / 24);

        mins = mins % 60;
        hrs = hrs % 24;

        return days + ' days ' + hrs + ' hours ' + mins + ' minutes';
    };

    render() {
        return (
            <div><br/><br/>
                <div className="card">
                    <div className="card-header">
                        <h5 className="d-inline">Assignment/Exam Details</h5>

                        <Link to={"/assignments/" + this.state.assignment._id + "/edit"}>
                            <input type="button" value="Edit" className="btn btn-dark float-right d-inline "/>
                        </Link>

                    </div>

                    <br/>

                    <div className="input-group mx-2 mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Document File</span>
                        </div>
                        <a id="assigned_doc" className="form-control alert-link mr-3"
                           href={BASE_URL + this.state.assignment.file_url}
                           download>
                            <IconJoiner type="assignment" ext={this.state.assignment.file_ext}/>
                            {"---" + this.state.assignment.file_name}
                        </a>
                    </div>

                    <div className="input-group mx-2 mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Assigned Date</span>
                        </div>
                        <label className="form-control nav-link mr-3" id="assigned_date">
                            {moment(this.state.assignment.assigned_date).format('Do MMMM YYYY')}
                        </label>
                    </div>

                    <div className="input-group mx-2 mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Due Date</span>
                        </div>
                        <label className="form-control nav-link mr-3" id="due_date">
                            {moment(this.state.assignment.due_date).format('dddd, Do MMMM YYYY, h:mm A')}
                        </label>
                    </div>

                    <div className="input-group mx-2 mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Time Remaining</span>
                        </div>
                        <label className="form-control nav-link mr-3"
                               id="remaining_time ">{this.getRemainingTime(this.state.assignment.due_date)}</label>
                    </div>

                    <div className="input-group mx-2 mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Last Modified</span>
                        </div>
                        <label className="form-control nav-link mr-3" id="modified_date">
                            {moment(this.state.assignment.modified_date).format('ddd, Do MMM YYYY, h:mm A')}
                        </label>
                    </div>
                </div>
                <br/><br/>
            </div>
        );
    }
}


