import React, {Component} from 'react';
import {Collapse, Button, CardBody, Card} from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import {Link} from "react-router-dom";


const BASE_URL = 'http://localhost:4000/';

const CourseLinkView = ({course}) => (
    <li className="list-group-item">
        <Link to={'/courses/' + course._id}>
            <label className="d-inline">
                <label className="alert-link">{"---" + course.courseName}</label>
            </label>
        </Link>
    </li>
);

export default class ViewSystemCourses extends Component {

    constructor(props) {
        super(props);
        this.toggle1 = this.toggle1.bind(this);
        this.toggle2 = this.toggle2.bind(this);
        this.toggle3 = this.toggle3.bind(this);
        this.toggle4 = this.toggle4.bind(this);

        this.state = {
            collapse1: false,
            collapse2: false,
            collapse3: false,
            collapse4: false,
            courses: []
        };
    }

    componentDidMount() {

        axios.get(BASE_URL + 'courses/')
            .then(response => {
                this.setState({
                    courses: response.data.data,
                });

                console.log(this.state.courses);
            })
            .catch(function (error) {
                Swal.fire('Oops...', 'Course Data Not Found', 'error');
                console.log(error);
            });

    }


    toggle1() {
        this.setState({
            collapse1: !this.state.collapse1,
            collapse2: false,
            collapse3: false,
            collapse4: false
        });
    }

    toggle2() {
        this.setState({
            collapse2: !this.state.collapse2,
            collapse1: false,
            collapse3: false,
            collapse4: false
        });
    }

    toggle3() {
        this.setState({
            collapse3: !this.state.collapse3,
            collapse2: false,
            collapse1: false,
            collapse4: false
        });
    }

    toggle4() {
        this.setState({
            collapse4: !this.state.collapse4,
            collapse2: false,
            collapse3: false,
            collapse1: false
        });
    }

    render() {
        return (
            <div>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <label id="year_label" className="nav-link alert-link active" onClick={this.toggle1}
                               style={{marginBottom: '1rem'}}>1st Year</label>
                    </li>
                    <li className="nav-item">
                        <label className="nav-link" onClick={this.toggle2} style={{marginBottom: '1rem'}}>2nd
                            Year</label>
                    </li>
                    <li className="nav-item">
                        <label className="nav-link" onClick={this.toggle3} style={{marginBottom: '1rem'}}>3rd
                            Year</label>
                    </li>
                    <li className="nav-item">
                        <label className="nav-link" onClick={this.toggle4} style={{marginBottom: '1rem'}}>4rd
                            Year</label>
                    </li>
                </ul>

                <ul>
                    {
                        this.state.courses.map((course, i) => {
                            return <CourseLinkView course={course} key={i}/>;
                        })
                    }
                </ul>
                <Collapse isOpen={this.state.collapse1}>
                    <Card>
                        <CardBody>
                            <ul>
                                {
                                    this.state.courses.map((course, i) => {
                                        if (course.year === '1')
                                            return <CourseLinkView course={course} key={i}/>;
                                        else
                                            return null;
                                    })
                                }
                            </ul>
                        </CardBody>
                    </Card>
                </Collapse>

                <Collapse isOpen={this.state.collapse2}>
                    <Card>
                        <CardBody>
                            <ul>
                                {
                                    this.state.courses.map((course, i) => {
                                        if (course.year === '2')
                                            return <CourseLinkView course={course} key={i}/>;
                                        else
                                            return null;
                                    })
                                }
                            </ul>
                        </CardBody>
                    </Card>
                </Collapse>

                <Collapse isOpen={this.state.collapse3}>
                    <Card>
                        <CardBody>
                            <ul>
                                {
                                    this.state.courses.map((course, i) => {
                                        if (course.year === '3')
                                            return <CourseLinkView course={course} key={i}/>;
                                        else
                                            return null;
                                    })
                                }
                            </ul>
                        </CardBody>
                    </Card>
                </Collapse>

                <Collapse isOpen={this.state.collapse4}>
                    <Card>
                        <CardBody>
                            <ul>
                                {
                                    this.state.courses.map((course, i) => {
                                        if (course.year === '4')
                                            return <CourseLinkView course={course} key={i}/>;
                                        else
                                            return null;
                                    })
                                }
                            </ul>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        );
    }
}
