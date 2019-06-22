import React, {Component} from 'react';
import {Link} from "react-router-dom";
import moment from 'moment';
import axios from 'axios';
import IconJoiner from "../../utils/icon-selector.component";
import Swal from "sweetalert2";
import $ from "jquery";


const BASE_URL = 'http://localhost:4000/';

export default class AssessmentSubmission extends Component {

    constructor(props) {
        super(props);

        this.state = {
            assessment: '',
            file: '',
            file_name: '',
            file_url: '',
            file_ext: '',
            modified_date: '',
            due_date_passed: false,
            assessment_id: '',
            student: '',
        };
    }

    componentDidMount() {
        $(".custom-file-input").on("change", function () {
            let fileName = $(this).val().split("\\").pop();
            $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
        });

        axios.get(BASE_URL + 'assessments/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    assessment: response.data.data,
                });
            })
            .catch(err => {
                Swal.fire('Oops...', 'Assessment View Failed', 'error');
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

    fileUploadHandler = (e) => {
        this.setState({
            file: e.target.files[0]
        })
    };

    handleAddSubmit = (e) => {
        e.preventDefault();

        let currentDate = moment(new Date()).format("YYYY-MM-DDTkk:mm");
        let dueDate = moment(new Date(this.state.assessment.due_date)).format("YYYY-MM-DDTkk:mm");

        if (currentDate > dueDate) {
            this.setState({
                due_date_passed: true
            })
        }

        const fd = new FormData();
        fd.append("file", this.state.file);

        if (this.state.file.size <= 10 * 1024 * 1024) {

            axios.post(BASE_URL + 'submissions/upload-file', fd, {
                onUploadProgress: progressEvent => {
                    console.log('Upload Progress : ' + Math.round((progressEvent.loaded / progressEvent.total) * 100));
                }
            })
                .then(res => {

                    if (res.data.status !== 400) {
                        let file = this.state.file.name.split(".");
                        let fileName = file[0].charAt(0).toUpperCase() + file[0].slice(1);
                        let extension = file[1];

                        const newSubmission = {
                            assessment: this.state.assessment._id,
                            student: sessionStorage.getItem('userId'),
                            modified_date: currentDate,
                            due_date_passed: this.state.due_date_passed,
                            file_name: fileName,
                            file_url: res.data.file_url,
                            file_ext: extension
                        };

                        axios.post(BASE_URL + 'submissions/', newSubmission)
                            .then(res => {
                                Swal.fire('Submission Uploaded Successfully', '', 'success');
                                console.log(res.data.message)
                            });
                    } else {
                        Swal.fire('Oops...', res.data.message, 'error')
                    }

                })
                .catch(err => {
                    Swal.fire('Oops...', 'Submission Creation Failed', 'error');
                    console.log(err.message)
                });
        } else {
            Swal.fire('Oops..File is Too Large', 'Maximum Upload limit 10 MB', 'error')
        }

    };

    render() {
        return (
            <div>
                <br/><br/>
                <div className="card">
                    <div className="card-header">
                        <h5 className="d-inline">Assessment Details</h5>
                    </div>

                    <br/>

                    <div className="input-group mx-2 mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Document File</span>
                        </div>

                        <a id="assigned_doc" className="form-control alert-link mr-3"
                           href={BASE_URL + this.state.assessment.file_url} download>
                            <IconJoiner ext={this.state.assessment.file_ext}/>
                            {"---" + this.state.assessment.file_name}
                        </a>
                    </div>

                    <div className="input-group mx-2 mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Assigned Date</span>
                        </div>
                        <label className="form-control nav-link mr-3" id="assigned_date">
                            {moment(this.state.assessment.assigned_date).format('Do MMMM YYYY')}
                        </label>
                    </div>

                    <div className="input-group mx-2 mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Due Date</span>
                        </div>
                        <label className="form-control nav-link mr-3" id="due_date">
                            {moment(this.state.assessment.due_date).format('dddd, Do MMMM YYYY, h:mm A')}
                        </label>
                    </div>

                    <div className="input-group mx-2 mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Time Remaining</span>
                        </div>
                        <label className="form-control nav-link mr-3"
                               id="remaining_time ">{this.getRemainingTime(this.state.assessment.due_date)}</label>
                    </div>

                    <form onSubmit={this.handleAddSubmit}>
                        <div className="input-group mx-2 mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Upload Document <small> (Max:10MB)</small>:</span>
                            </div>
                            <div className="custom-file mr-3">
                                <input type="file"
                                       className="custom-file-input"
                                       onChange={this.fileUploadHandler}
                                       id="input_File"
                                       required/>
                                <label className="custom-file-label form-control">Choose file</label>
                            </div>
                        </div>
                        <br/>
                        <div className="col text-center mb-3">
                            <button id="add_material" className="btn btn-primary">Upload</button>
                            <br/><br/>
                        </div>
                    </form>

                </div>
            </div>
        );
    }
}


