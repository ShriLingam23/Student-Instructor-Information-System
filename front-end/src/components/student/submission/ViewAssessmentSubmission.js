import React, {Component} from 'react';
import {Link} from "react-router-dom";
import IconJoiner from "../../../utils/icon-selector.component";
import moment from 'moment';
import axios from 'axios';
import Swal from "sweetalert2";


const BASE_URL = 'http://localhost:4000/';

export default class ViewAssessmentSubmission extends Component {

    constructor(props) {
        super(props);

        this.state = {
            submission: '',
        };
    }

    componentDidMount() {
        console.log(this.props.match.params.id);
        axios.get(BASE_URL + 'submissions/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    submission: response.data.data,
                });
            })
            .catch(err => {
                Swal.fire('Oops...', 'Assessment Submission View Failed', 'error');
                console.log(err.message)
            });
    }

    componentDidUpdate() {
        axios.get(BASE_URL + 'submissions/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    submission: response.data.data,
                });
            })
            .catch(err => {
                Swal.fire('Oops...', 'Assessment Submission View Failed', 'error');
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
            <div>
                <div className="card">
                    <div className="card-header">
                        <h5 className="d-inline">Assessment Details</h5>

                        <Link to={"/submissions/" + this.state.submission._id + "/edit"}>
                            <input type="button" value="Edit" className="btn btn-dark float-right d-inline "/>
                        </Link>

                    </div>

                    <br/>

                    <div className="input-group mx-2 mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Document File</span>
                        </div>
                        <a id="assigned_doc" className="form-control alert-link mr-3"
                           href={BASE_URL + this.state.submission.file_url}
                           download>
                            <IconJoiner ext={this.state.submission.file_ext}/>
                            {"---" + this.state.submission.file_name}
                        </a>
                    </div>


                    <div className="input-group mx-2 mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Status</span>
                        </div>
                        <label className="form-control nav-link mr-3" id="due_date">
                            {this.state.submission.due_date_passed ? (<div>Delayed</div>) : <div>Early</div>}
                        </label>
                    </div>

                    <div className="input-group mx-2 mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Last Modified</span>
                        </div>
                        <label className="form-control nav-link mr-3" id="modified_date">
                            {moment(this.state.submission.modified_date).format('ddd, Do MMM YYYY, h:mm A')}
                        </label>
                    </div>
                </div>
            </div>
        );
    }
}




