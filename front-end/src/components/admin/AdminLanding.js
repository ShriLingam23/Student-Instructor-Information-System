import React, {Component} from 'react';
import {Link} from 'react-router-dom'

import course from '../../assets/img/login.jpg'
import instructor from '../../assets/img/groupStudy.jpg'
import student from '../../assets/img/graduate.jpg'
import '../../assets/css/Landing.css'
import '../../assets/css/Admin.css'

import Slide from './Slides'
import Notice_View from './Notice/Notice_View'

class AdminLanding extends Component {


    render() {
        return (
            <div className="parallax">
            <div className="container" style={{paddingTop: '20px'}}>

                {/* <!--Body--> */}

                <main role="main">

                    <section className="jumbotron text-center">
                        <div className="container">
                            {/* <h1 className="jumbotron-heading">Album example</h1> */}
                            <Slide/>
                            {/* <p className="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it entirely.</p> */}
                            {/* <p>
                            <a href="#" className="btn btn-primary my-2">Main call to action</a> { }
                            <a href="#" className="btn btn-secondary my-2">Secondary action</a>
                        </p> */}
                        </div>
                    </section>

                    <div className="album py-5 bg-light">
                        <div className="container">

                            <div className="row" style={{marginBottom: '-25px'}}>
                                <div className="col-md-4">
                                    <div className="card mb-4 shadow-sm">
                                        <h5 className="jumbotron-heading text-info"
                                            style={{marginTop: '10px', textAlign: 'center'}}>Instructors</h5>
                                        <hr className="md-2"/>
                                        <img src={instructor} className="card-img-top" alt="..."
                                             style={{paddingLeft: '7px', paddingRight: '7px'}}/>
                                        <div className="card-body">
                                            <p className="card-text">Any opinions in the examples do not represent the
                                                opinion of the Cambridge Dictionary editors or of Cambridge University
                                                Press or its licensors.A specialised subject that involves skill. </p>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="btn-group">
                                                    <button type="button" className="btn btn-sm btn-outline-secondary">
                                                        <Link to='/staff/view'>View</Link></button>
                                                    <button type="button" className="btn btn-sm btn-outline-secondary">
                                                        <Link to='/staff/add'>Add</Link></button>
                                                </div>
                                                <small className="text-muted">9 mins</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card mb-4 shadow-sm">
                                        <h5 className="jumbotron-heading text-info"
                                            style={{marginTop: '10px', textAlign: 'center'}}>Courses</h5>
                                        <hr className="md-2"/>
                                        <img src={course} className="card-img-top" alt="..."
                                             style={{paddingLeft: '7px', paddingRight: '7px'}}/>
                                        <div className="card-body">
                                            <p className="card-text">Courses are designed for continuing personal
                                                development and are offered by a number of leading universities,
                                                schools, and other educational institutions around the world.</p>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="btn-group">
                                                    <button type="button" className="btn btn-sm btn-outline-secondary">
                                                        <Link to='/course/view'>View</Link></button>
                                                    <button type="button" className="btn btn-sm btn-outline-secondary">
                                                        <Link to='/course/add'>Add</Link></button>
                                                </div>
                                                <small className="text-muted">9 mins</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card mb-4 shadow-sm">
                                        <h5 className="jumbotron-heading text-info"
                                            style={{marginTop: '10px', textAlign: 'center'}}>Students</h5>
                                        <hr className="md-2"/>
                                        <img src={student} className="card-img-top" alt="..."
                                             style={{paddingLeft: '7px', paddingRight: '7px'}}/>
                                        <div className="card-body">
                                            <p className="card-text">A student is primarily a person enrolled in a
                                                school or other educational institution who attends classes in a course
                                                to attain the appropriate level of mastery of a subject</p>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="btn-group">
                                                    <button type="button" className="btn btn-sm btn-outline-secondary">
                                                        <Link to='/student/view'>View</Link></button>
                                                </div>
                                                <small className="text-muted">9 mins</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>

                    <div className="container bg-light"
                         style={{marginTop: '20px', marginBottom: '50px', paddingTop: '50px', paddingBottom: '50px'}}>
                        <Notice_View/>
                    </div>

                </main>

            </div>
</div>

        )
    }
}

export default AdminLanding;