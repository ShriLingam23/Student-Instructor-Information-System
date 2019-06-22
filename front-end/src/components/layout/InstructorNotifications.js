import React, {Component} from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import {BASE_URL} from '../../index';
// const BASE_URL = 'http://localhost:4000/';
export default class InstructorNotifications extends Component {

    constructor(props) {
        super(props);

        this.state = {
            notifications: []
        }
    }

    componentDidMount() {
        axios.get(BASE_URL + 'notifications/instructors/' + sessionStorage.getItem('userId'))
            .then(response => {
                this.setState({
                    notifications: response.data.data,
                });
            })
            .catch(function (error) {
                Swal.fire('Oops...', ' Course Notification Data Not Found', 'error');
                console.log(error);
            });
    }

    componentDidUpdate() {
        axios.get(BASE_URL + 'notifications/instructors/' + sessionStorage.getItem('userId'))
            .then(response => {
                this.setState({
                    notifications: response.data.data,
                });
            })
            .catch(function (error) {
                Swal.fire('Oops...', ' Course Notification Data Not Found', 'error');
                console.log(error);
            });
    }

    onClickDeclineHandler = (id) => {

        Swal.fire({
            title: 'Are you sure?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Decline it!',
            cancelButtonText: 'Cancel'

        }).then((result) => {
            if (result.value) {

                axios.delete(BASE_URL + 'notifications/' + id)
                    .then(res => {
                        console.log(res.data);
                    })
                    .catch(err => console.log(err.message));
            }
        });

    };

    onClickAcceptHandler = (courseId, notificationId, instructorId) => {

        axios.put(BASE_URL + 'courses/' + courseId, {
            instructorId: sessionStorage.getItem('userId')
        }).then(res => {
            console.log(res.data);

            axios.put(BASE_URL + 'instructors/' + instructorId, {
                courseId: courseId
            }).then(res => {
                console.log(res.data);

                axios.put(BASE_URL + 'notifications/' + notificationId, {
                    status: true
                }).then(res => {
                    console.log(res.data);
                }).catch(err => console.log(err.message));

            }).catch(err => console.log(err.message));

        }).catch(err => console.log(err.message));


    };

    render() {
        return (
            <div>
                {
                    this.state.notifications.map((notification, i) => {
                        if (notification.status === false)
                            return (
                                <div className="alert alert-secondary" key={i}>
                                    <label className="mt-1">You have been Assigned to new Course
                                        : {notification.course.name}</label>
                                    <input type="button" value="Decline"
                                           onClick={() => this.onClickDeclineHandler(notification._id)}
                                           className="float-right btn btn-danger"/>
                                    <input type="button" value="Accept"
                                           onClick={() => this.onClickAcceptHandler(notification.course._id, notification._id, notification.instructor)}
                                           className="float-right btn btn-secondary mr-3"/>
                                </div>
                            );
                        else
                            return null;
                    })
                }
            </div>
        );
    }
}