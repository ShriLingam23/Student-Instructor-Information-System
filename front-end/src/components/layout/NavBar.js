import React, {Component} from 'react';
import logo from "../../assets/images/logo.svg";
import {Link, withRouter} from "react-router-dom";
import Icon from '../../assets/images/logo.svg'

class NavBar extends Component {
    //logout user
    onLogout = (e) => {
        e.preventDefault();
        sessionStorage.clear(); //clear session variables
        localStorage.clear(); //clear local variables
        this.props.history.push('/') //redirect to search page
    };

    render() {
        const beforeLogin = (
            <div className="mt-2 mt-md-0">
                <Link to="/login">
                    <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Login</button>
                </Link>
            </div>
        );

        const afterLogin = (
            <div className="mt-2 mt-md-0">
                <label
                    className="btn-link alert-link text-white pr-2"> {sessionStorage.getItem('loggedUser') + "  "} </label>
                <Link to="/">
                    <input type="button" className="btn btn-outline-light my-2 my-sm-0" onClick={this.onLogout}
                           value="Logout"/>
                </Link>
            </div>
        );

        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <img className="navbar-brand" src={logo} width="40" height="40" alt="logo"/>
                <Link to="/" className="navbar-brand">
                    SIIS
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#collapse-navbar">
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="collapse navbar-collapse" id="collapse-navbar">
                    {
                        sessionStorage.getItem('userType') === 'instructor' ?
                            (
                                <ul className="navbar-nav text-justify mr-auto">
                                    <li className="navbar-item ">
                                        <Link to='/home' className="nav-link">Home</Link>
                                    </li>
                                    <li className="navbar-item ">
                                        <Link to={'/courses'}
                                              className="nav-link">Courses</Link>
                                    </li>
                                </ul>
                            )
                            : sessionStorage.getItem('userType') === 'student' ?
                            (
                                <ul className="navbar-nav text-justify mr-auto">
                                    <li className="navbar-item ">
                                        <Link to='/home' className="nav-link">Home</Link>
                                    </li>
                                    <li className="navbar-item ">
                                        <Link to={'/courses'}
                                              className="nav-link">Courses</Link>
                                    </li>
                                    <li className="navbar-item ">
                                        <Link to={'/submissions/assessment/' + sessionStorage.getItem('assessmentSubmissionId')}
                                              className="nav-link">Submission</Link>
                                    </li>
                                </ul>
                            ):null
                    }

                    {sessionStorage.loggedUser ? afterLogin : beforeLogin}
                </div>
            </nav>
        );
    }
}

export default withRouter(NavBar);