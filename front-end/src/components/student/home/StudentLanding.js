import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import course from '../../../assets/img/login.jpg'
import notification from '../../../assets/img/signup02.jpg'
import '../../../assets/css/Landing.css'
import Slide from "./Slides";
import '../../../assets/css/Admin.css'
import StudentNotification from "../submission/StudentNotification";

export default class StudentLanding extends Component {

    render() {
        return (
            <div className="container" style={{paddingTop: '20px'}}>

                {/* <!--Body--> */}

                <main role="main">

                    <section className="card text-center">
                        <div className="container card-body bg-light">
                            <Slide/>
                            <br/>
                            <h5 className="card-title">Welcome {sessionStorage.getItem('loggedUser')} !!!</h5>

                            <p className="card-text lead text-muted">Something short and leading about the collection
                                below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don’t
                                simply skip over it entirely.
                            </p>
                        </div>
                    </section>

                    <div className="album py-5 bg-light">
                        <div className="container">

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="card mb-4 shadow-sm">
                                        <h5 className="jumbotron-heading text-info"
                                            style={{marginTop: '10px', textAlign: 'center'}}>Notifications</h5>
                                        <hr className="md-2"/>
                                        <img src={notification} className="card-img-top" alt="..." style={{paddingLeft: '7px', paddingRight: '7px'}}/>
                                        <div className="card-body">
                                            <p className="card-text">Instructor ,Senior Lecturer, Lecturer and Lab Assistant can Accept or Decline Course Notifications anytime</p>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <small className="text-muted">View Notifications</small>

                                                <div className="btn-group">
                                                    <div className="modal fade bd-example-modal-lg" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                                        <div className="modal-dialog modal-lg">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h5 className="modal-title">Notifications</h5>
                                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                        <span aria-hidden="true">×</span>
                                                                    </button>
                                                                </div>
                                                                <div className="modal-body">
                                                                    <StudentNotification/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <button type="button" className="btn btn-sm btn-outline-secondary" data-toggle="modal" data-target=".bd-example-modal-lg">View</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="card mb-4 shadow-sm">
                                        <h5 className="jumbotron-heading text-info"
                                            style={{marginTop: '10px', textAlign: 'center'}}>Courses</h5>
                                        <hr className="md-2"/>
                                        <img src={course} className="card-img-top" style={{paddingLeft: '7px', paddingRight: '7px'}} alt="..."/>
                                        <div className="card-body">
                                            <p className="card-text">Courses are offered by a number of leading universities,
                                                and other educational institutions around the world.</p>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <small className="text-muted">View Accepted Courses</small>
                                                <div className="btn-group">
                                                    <Link to='/courses'>
                                                        <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <br/><br/>
            </div>
        )
    }
}