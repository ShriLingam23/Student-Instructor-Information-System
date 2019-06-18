import React, {Component} from 'react'
import moment from 'moment'
import axios from 'axios'
import $ from "jquery";
import Swal from 'sweetalert2';

const BASE_URL = 'http://localhost:4000/';

export default class EditAssignment extends Component {

    constructor(props) {
        super(props);

        this.state = {
            time: {
                days: 0,
                hour: 0,
                minutes: 0
            },
            file: '',
            file_name: '',
            file_url: '',
            file_ext: '',
            due_date: '',
            link_name: '',
            assigned_date: '',
            modified_date: '',
            file_type: 'assignment',
            date_modified: false,
            file_modified: false,
        };
    }

    componentDidMount() {
        $(".custom-file-input").on("change", function () {
            let fileName = $(this).val().split("\\").pop();
            $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
        });

        axios.get(BASE_URL + 'assignments/' + this.props.match.params.id)
            .then(response => {
                let data = response.data.data[0];
                this.setState({
                    assigned_date: data.assigned_date,
                    modified_date: data.modified_date,
                    due_date: moment(new Date(data.due_date)).format('YYYY-MM-DDTHH:mm'),
                    file_name: data.file_name,
                    file_url: data.file_url,
                    file_ext: data.file_ext,
                    link_name: data.link_name

                });

                document.getElementById('assigned_date').innerHTML = moment(response.data.assigned_date).format('dddd, Do MMMM YYYY');
                document.getElementById('modified_date').innerHTML = moment(response.data.modified_date).format('dddd, Do MMMM YYYY, h:mm A');

                this.getRemainingTime();
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    getRemainingTime() {
        let currentDate = new Date();
        let dueDate = new Date(this.state.due_date);
        let dayDiffs = dueDate.getTime() - currentDate.getTime();

        let mins = Math.floor(dayDiffs / 60000);
        let hrs = Math.floor(mins / 60);
        let days = Math.floor(hrs / 24);

        mins = mins % 60;
        hrs = hrs % 24;

        this.setState({
            time: {
                days: days,
                hour: hrs,
                minutes: mins
            }
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

        if (dueDate > currentDate) {
            this.setState({
                time: {
                    days: days,
                    hour: hrs,
                    minutes: mins
                },
                modified_date: currentDate,
                due_date: moment(new Date(document.getElementById('due_date').value)).format('YYYY-MM-DDTHH:mm'),
                date_modified: true
            });

            document.getElementById('remaining_time').innerHTML = days + ' days ' + hrs + ' hours ' + mins + ' minutes';
        }
    };


    fileUploadHandler = (e) => {
        this.setState({
            file: e.target.files[0],
            file_modified: true
        })
    };

    handleUpdateSubmit = (e) => {
        e.preventDefault();
        let currentDate = moment(new Date()).format("YYYY-MM-DDTkk:mm");
        let dueDate = moment(new Date(document.getElementById('due_date').value)).format("YYYY-MM-DDTkk:mm");

        this.setState({
            modified_date: currentDate,
            due_date: dueDate
        });

        if (dueDate > currentDate) {

            if (this.state.date_modified === false && this.state.file_modified === false) {
                Swal.fire({
                    title: 'Are you sure?',
                    text: 'Nothing Changed',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, Update it!',
                    cancelButtonText: 'Cancel'

                }).then((result) => {
                    if (result.value) {
                        this.props.history.push('/assignment-view/' + this.props.match.params.id);
                    }
                });

            } else if (this.state.date_modified === true && this.state.file_modified === false) {
                let newAssignment = {
                    assigned_date: this.state.assigned_date,
                    modified_date: this.state.modified_date,
                    due_date: this.state.due_date,
                    file_type: this.state.file_type,
                    file_name: this.state.file_name,
                    file_url: this.state.file_url,
                    file_ext: this.state.file_ext,
                    link_name: this.state.link_name

                };

                axios.put(BASE_URL + 'assignments/' + this.props.match.params.id, newAssignment)
                    .then(() => {
                        Swal.fire({
                            title: 'Assignment Successfully Updated',
                            type: 'success',
                            confirmButtonText: 'OK',

                        }).then((result) => {
                            if (result.value) {
                                this.props.history.push('/assignment-view/' + this.props.match.params.id);
                            }
                        });

                    })
                    .catch(err => console.log(err.message));


            } else if (this.state.file_modified === true) {
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

                            let deleteFile = {
                                file_url: this.state.file_url
                            };

                            axios.post(BASE_URL + 'assignments/delete-file', deleteFile);

                            let newAssignment = {
                                assigned_date: this.state.assigned_date,
                                modified_date: this.state.modified_date,
                                due_date: this.state.due_date,
                                file_name: fileName,
                                file_url: res.data.file_url,
                                file_type: this.state.file_type,
                                file_ext: extension,
                                link_name: this.state.link_name

                            };
                            axios.put(BASE_URL + 'assignments/' + this.props.match.params.id, newAssignment)
                                .then(() => {
                                    Swal.fire({
                                        title: 'Assignment Successfully Updated',
                                        type: 'success',
                                        confirmButtonText: 'OK',

                                    }).then((result) => {
                                        if (result.value) {
                                            this.props.history.push('/assignment-view/' + this.props.match.params.id);
                                        }
                                    });
                                })

                            } else {
                                Swal.fire('Oops...', res.data.message, 'error')
                            }
                        })
                        .catch(err => console.log(err.message));
                } else {
                    Swal.fire('Oops..File is Too Large', 'Maximum Upload limit 10 MB', 'error')
                }
            }

        } else {
            Swal.fire('Oops...', 'Assign Proper Due Date', 'error');
        }
    };

    render() {
        return (
            <div><br/><br/>
                <div className="card">
                    <form onSubmit={this.handleUpdateSubmit}>

                        <div className="form-inline card-header">
                            <h5 className="mt-2">Edit Assignment Details</h5>
                        </div>
                        <br/>

                        <div className="form-group mx-sm-2 ml-2 mr-2">
                            <label className="ml-1">Assigned Date:</label>
                            <label className="form-control bg-light" id="assigned_date">Assigned Date</label>
                        </div>

                        <div className="form-group mx-sm-2 ml-2 mr-2">
                            <label>Last Modified Date:</label>
                            <label className="form-control bg-light" id="modified_date">Last Modified Date</label>
                        </div>

                        <div className="form-group mx-sm-2 ml-2 mr-2">
                            <label className="ml-1">Due Date:</label>
                            <input type="datetime-local"
                                   className="form-control"
                                   name="due_date"
                                   id="due_date"
                                   value={this.state.due_date}
                                   onChange={this.onChangeRemainingTime}
                                   required/>
                        </div>

                        <div className="form-group mx-sm-2 ml-2 mr-2">
                            <label className="ml-1">Remaining Time:</label>
                            <label className="form-control bg-light"
                                   id="remaining_time">{this.state.time.days} days {this.state.time.hour} hours {this.state.time.minutes} minutes</label>
                        </div>

                        <div className="form-group mx-sm-2 ml-2 mr-2">
                            <label className="ml-1">Assignment Document:</label>
                            <div className="custom-file">
                                <input type="file"
                                       className="custom-file-input"
                                       title=" "
                                       data-buttontext="Select a File"
                                       onChange={this.fileUploadHandler}
                                       id="input_File"/>
                                <label className="custom-file-label form-control">
                                    {this.state.file_name}
                                </label>
                            </div>
                        </div>
                        <br/>
                        <div className="col text-center mb-3">
                            <button id="add_material" className="btn btn-primary">
                                Update Assignment
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}