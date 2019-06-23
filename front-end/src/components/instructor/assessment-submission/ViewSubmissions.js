import React, {Component} from 'react';
import moment from 'moment';
import axios from 'axios';
import IconJoiner from "../../../utils/icon-selector.component";
import Swal from "sweetalert2";

import {BASE_URL} from '../../../index';
// const BASE_URL = 'http://localhost:4000/';

export default class ViewSubmissions extends Component {

    constructor(props) {
        super(props);

        this.state = {
            submissions: []
        };
    }

    componentDidMount() {
        axios.get(BASE_URL + 'submissions/assessment/' + this.props.assessment_id)
            .then(response => {
                this.setState({
                    submissions: response.data.data,
                });
            })
            .catch(err => {
                Swal.fire('Oops...', 'Submissions View Failed', 'error');
                console.log(err.message)
            });
    }


    componentDidUpdate() {
        axios.get(BASE_URL + 'submissions/assessment/' + this.props.assessment_id)
            .then(response => {
                this.setState({
                    submissions: response.data.data,
                });
            })
            .catch(err => {
                Swal.fire('Oops...', 'Submissions View Failed', 'error');
                console.log(err.message)
            });
    }

    onClickAssignMarks = (id) => {
        let marks = document.getElementById(id).value;

        if (0 <= marks && marks <= 100) {
              axios.put(BASE_URL + 'submissions/' + id,{marks: marks})
                .then(response => {
                    console.log(response.data.message)
                })
                .catch(err => {
                    Swal.fire('Oops...', 'Submissions View Failed', 'error');
                    console.log(err.message)
                });

        } else {
            Swal.fire('Oops...', 'Assign Marks between 0 and 100', 'error');
        }
    };

    render() {
        return (
            <div>
                <br/><br/>
                <div className="card">
                    <div className="card-header">
                        <h5 className="d-inline">Submission Details</h5>
                    </div>
                </div>
                <table className="table table-bordered table-striped table-responsive-sm">
                    <thead>
                    <tr>
                        <th>Student Email</th>
                        <th>Submission Date</th>
                        <th>Submission File</th>
                        <th>Status</th>
                        <th>Assign Marks</th>
                        <th>Marks</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.submissions.map((submission, i) => {
                            return (
                                <tr key={i}>
                                    <td>{submission.student.email}</td>
                                    <td>{moment(submission.modified_date).format('Do MMMM YYYY')}</td>
                                    <td>
                                        <a id="assigned_doc" className="alert-link mr-3"
                                           href={BASE_URL + submission.file_url}
                                           download>
                                            <IconJoiner ext={submission.file_ext}/>
                                            {"---" + submission.file_name}
                                        </a>
                                    </td>
                                    <td>{submission.due_date_passed ? (<div>Delayed</div>) : <div>Early</div>}</td>
                                    <td>
                                        <div className="input-group">
                                            <input type="number"
                                                   id={submission._id}
                                                   className="form-control"
                                                   placeholder="Enter Marks"/>
                                            <div className="input-group-append">
                                                <input type="button"
                                                       value="Assign"
                                                       onClick={()=>this.onClickAssignMarks(submission._id)}
                                                       className="btn btn-info"/>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{submission.marks}%</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
                <br/><br/>
            </div>
        );
    }
}


