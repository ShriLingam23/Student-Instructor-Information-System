import React, {Component} from 'react';
import {Link} from "react-router-dom";
import moment from 'moment';
import axios from 'axios';
import IconJoiner from "../../../utils/icon-selector.component";
import Swal from "sweetalert2";

const BASE_URL = 'http://localhost:4000/';



export default class ViewSubmissions extends Component {

    constructor(props) {
        super(props);

        this.state = {
            submissions: '',
        };
    }

    // componentDidMount() {
    //     axios.get(BASE_URL + 'submissions/')
    //         .then(response => {
    //             this.setState({
    //                 submissions: response.data.data,
    //             });
    //         })
    //         .catch(err => {
    //             Swal.fire('Oops...', 'Submissions View Failed', 'error');
    //             console.log(err.message)
    //         });
    // }
    //
    // componentDidUpdate() {
    //     axios.get(BASE_URL + 'submissions/')
    //         .then(response => {
    //             this.setState({
    //                 submissions: response.data.data,
    //             });
    //         })
    //         .catch(err => {
    //             Swal.fire('Oops...', 'Submissions View Failed', 'error');
    //             console.log(err.message)
    //         });
    // }

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
                        <th>Student ID</th>
                        <th>Submission Date</th>
                        <th>Submission File</th>
                        <th>Submission Status</th>
                        <th>Assign Marks</th>
                        <th>Marks</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Praveen</td>
                        <td>a</td>
                        <td>
                            <a id="assigned_doc" className="alert-link mr-3"
                               href={BASE_URL + this.state.submissions.file_url}
                               download>
                                <IconJoiner ext={this.state.submissions.file_ext}/>
                                {"---" + this.state.submissions.file_name}
                            </a>
                        </td>
                        <td>a</td>
                        <td>
                            <div className="input-group">
                                <input type="number" min="0" max="100" className="form-control" placeholder="Enter Marks"/>
                                    <div className="input-group-append">
                                        <input type="button" value="Assign" className="btn btn-info"/>
                                    </div>
                            </div>
                        </td>
                        <td>0%</td>
                    </tr>
                    </tbody>
                </table>
                <br/><br/>
            </div>
        );
    }
}


