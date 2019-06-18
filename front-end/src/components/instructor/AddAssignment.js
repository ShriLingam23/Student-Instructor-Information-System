import React, {Component} from 'react'
import axios from 'axios'
import moment from 'moment';
import $ from 'jquery';
import Swal from 'sweetalert2';

const BASE_URL = 'http://localhost:4000/';

export default class AddAssignment extends Component {

    constructor(props) {
        super(props);

        this.state = {
            time: {
                days: 0,
                hour: 0,
                minutes: 0
            },
            assigned_date: '',
            modified_date: '',
            due_date: '',
            link_name: '',
            file_name: '',
            file_url: '',
            file_ext: '',
            file_type: 'assignment',
            file: '',
            valid_date: false,
        };
    }


    componentDidMount() {
        $(".custom-file-input").on("change", function () {
            let fileName = $(this).val().split("\\").pop();
            $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
        });

        $(document).ready(function () {
            $("#reset").click(function () {
                $("#input_File").siblings(".custom-file-label").addClass("selected").html('');
            });
        });
    }

    onChangeRemainingTime = () => {
        let currentDate = new Date();
        let dueDate = new Date(document.getElementById('due_date').value);
        let dayDiffs = dueDate.getTime() - currentDate.getTime();

        let mins = Math.floor(dayDiffs / 60000);
        let hrs = Math.floor(mins / 60);
        let days = Math.floor(hrs / 24);

        mins = mins % 60;
        hrs = hrs % 24;

        if (dueDate < currentDate) {
            Swal.fire('Oops...', 'Due Date is Passed', 'error');

            this.setState({
                valid_date: false
            })
        } else {
            this.setState({
                time: {
                    days: days,
                    hour: hrs,
                    minutes: mins
                },
                assigned_date: currentDate,
                modified_date: currentDate,
                due_date: document.getElementById('due_date').value,
                valid_date: true
            });
        }
    };

    fileUploadHandler = (e) => {
        this.setState({
            file: e.target.files[0]
        })
    };

    onTypeFileLinkHandler = (e) => {
        this.setState({
            link_name: e.target.value,
        })
    };

    handleAddSubmit = (e) => {
        e.preventDefault();

        if (this.state.valid_date === true) {

            const fd = new FormData();
            fd.append("file", this.state.file);

            if (this.state.file.size <= 10 * 1024 * 1024) {

                axios.post(BASE_URL + 'assignments/upload-file', fd, {
                    onUploadProgress: progressEvent => {
                        console.log('Upload Progress : ' + Math.round((progressEvent.loaded / progressEvent.total) * 100));
                    }
                })
                    .then(res => {

                        if (res.data.status !== 400) {
                            let file = this.state.file.name.split(".");
                            let fileName = file[0].charAt(0).toUpperCase() + file[0].slice(1);
                            let extension = file[1];

                            const newAssignment = {
                                assigned_date: this.state.assigned_date,
                                modified_date: this.state.modified_date,
                                due_date: this.state.due_date,
                                file_type: this.state.file_type,
                                file_name: fileName,
                                link_name: this.state.link_name,
                                file_url: res.data.file_url,
                                file_ext: extension
                            };

                            axios.post(BASE_URL + 'assignments/', newAssignment)
                                .then(res => {
                                    Swal.fire('Assignment Added Successfully', '', 'success');
                                    console.log(res.data)
                                });
                        } else {
                            Swal.fire('Oops...', res.data.message, 'error')
                        }

                    })
                    .catch(err => {
                        Swal.fire('Oops...', 'Assignment Added Failed', 'error');
                        console.log(err.message)
                    });
            } else {
                Swal.fire('Oops..File is Too Large', 'Maximum Upload limit 10 MB', 'error')
            }

        } else {
            Swal.fire('Oops...', 'Assign Proper Due Date', 'error');

            this.setState({
                valid_date: false
            })
        }
    };

    onReset = () => {
        this.setState({
            time: {
                days: 0,
                hour: 0,
                minutes: 0
            },
            file: '',
            file_name: '',
            file_url: '',
            file_ext: '',
            link_name: '',
            due_date: '',
            assigned_date: '',
            modified_date: '',
            valid_date: false,
        });
    };

    render() {
        return (
            <div className="card">
                <form id="form" onSubmit={this.handleAddSubmit}>
                    <div className="form-inline card-header">
                        <h5 className="mt-2">Add Assignment</h5>
                        <div className="form-group ml-auto">
                            <label className="d-link ml-1 alert-link mr-1">Date</label>
                            <label className="d-link form-control bg-light" id="assigned_date">
                                {moment().format('dddd, Do MMMM YYYY')}
                            </label>
                        </div>
                    </div>
                    <br/>

                    <div className="form-group mx-sm-2 ml-2 mr-2">
                        <label className="alert-link ml-1">Assignment Link Name:</label>
                        <div className="ml-auto">
                            <input type="text" className="form-control" onChange={this.onTypeFileLinkHandler}
                                   id="add_name"
                                   placeholder="Add Link Name" required/>
                        </div>
                    </div>

                    <div className="form-group mx-sm-2 ml-2 mr-2">
                        <label className="alert-link ml-1">Due Date:</label>
                        <input type="datetime-local"
                               className="form-control"
                               name="due_date"
                               id="due_date"
                               onChange={this.onChangeRemainingTime}
                               required/>
                    </div>

                    <div className="form-group mx-sm-2 ml-2 mr-2">
                        <label className="alert-link ml-1">Remaining Time:</label>
                        <label className="form-control"
                               id="remaining_time">{this.state.time.days} days {this.state.time.hour} hours {this.state.time.minutes} minutes</label>
                    </div>

                    <div className="form-group mx-sm-2 ml-2 mr-2">
                        <label className="alert-link ml-1">Upload Document:<small> (Max:10MB)</small></label>
                        <div className="custom-file">
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
                        <button id="add_material" className="btn btn-primary">
                            Add Assignment
                        </button>
                        <button type="reset" onClick={this.onReset} id="reset" className="btn btn-info float-right">
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}