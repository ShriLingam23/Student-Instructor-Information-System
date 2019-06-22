import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';

import logo from '../../../../assets/images/logo.svg'
import '../../../../assets/css/Landing.css'
import Slide from "./Slides";
import InstructorNotifications from "../../InstructorNotifications";

// const NotificationModel = (
//
// );

export default class Landing extends Component {


    render() {
        return (
            <div className="container" style={{paddingTop: '20px'}}>

                {/* <!--Body--> */}

                <main role="main">

                    <section className="card text-center">
                        <div className="container card-body">
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
                                        <img src={logo} className="card-img-top rounded-circle" alt="..."/>
                                        <div className="card-body">
                                            <p className="card-text">This is a wider card with supporting text below as
                                                a natural lead-in to additional content. This content is a little bit
                                                longer.</p>
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
                                                                    <InstructorNotifications/>
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
                                        <img src={logo} className="card-img-top rounded-circle" alt="..."/>
                                        <div className="card-body">
                                            <p className="card-text">This is a wider card with supporting text below as
                                                a natural lead-in to additional content. This content is a little bit
                                                longer.</p>
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
            </div>
        )
    }
}