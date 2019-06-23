import React, {Component} from 'react';
import logo from "../../assets/img/logo.svg";
import {Link, withRouter} from "react-router-dom";

class NavBar extends Component {
    //logout user
    onLogout = (e) => {
        e.preventDefault();
        sessionStorage.clear(); //clear session variables
        localStorage.clear(); //clear local variables
        this.props.history.push('/') //redirect to search page
    };

    render() {
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
                <Link to="/home" className="navbar-brand">
                    Loops' SIIS
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
                                </ul>
                            ) : sessionStorage.getItem('userType') === 'admin' ?
                                (
                                    <ul className="navbar-nav text-justify mr-auto">
                                        <li className="navbar-item ">
                                            <Link to='/home' className="nav-link">Home</Link>
                                        </li>
                                    </ul>
                                ) : null
                    }

                    {sessionStorage.loggedUser ? afterLogin : null}
                </div>
            </nav>
        );
    }
}

export default withRouter(NavBar);