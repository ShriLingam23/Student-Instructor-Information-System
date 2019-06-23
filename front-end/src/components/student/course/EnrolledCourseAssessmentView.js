import React, {Component} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {Link} from "react-router-dom";
import $ from "jquery";
import IconJoiner from "../../instructor/utils/icon-selector.component";

const BASE_URL = 'http://localhost:4000/';

const LinkView = ({assessment}) => (
    <li className="list-group-item">
        <Link to={'/assessments/' + assessment._id}>
            <label className="d-inline">
                <IconJoiner ext={assessment.file_type}/>
                <label className="alert-link">{"---" + assessment.link_name}</label>
            </label>
        </Link>
    </li>
);

export default class ViewCourseAssessments extends Component {

    constructor(props) {
        super(props);

        this.state = {
            assessments: [],
            course: '',
            file_url: '',
            file_type: '',
            enable_add_assessment: false
        };
    }

    componentDidMount() {
        $(document).ready(function () {
            $("#reset").click(function () {
                $("#input_File").siblings(".custom-file-label").addClass("selected").html('');
            });
        });

        axios.get(BASE_URL + 'assessments/course/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    assessments: response.data.data,
                });
            })
            .catch(function (error) {
                Swal.fire('Oops...', 'Assessments Data Not Found', 'error');
                console.log(error);
            });

        axios.get(BASE_URL + 'courses/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    course: response.data.data,
                });
            })
            .catch(function (error) {
                Swal.fire('Oops...', 'Course Data Not Found', 'error');
                console.log(error);
            });

    }

    assignmentListView() {
        return (
            <div><br/>
                <div className="card">
                    <div className="card-header">
                        <b>Assignments</b>
                    </div>
                    <ul className="list-group list-group-flush">
                        {
                            this.state.assessments.map((assignment, i) => {
                                if (assignment.file_type === 'assignment')
                                    return <LinkView  assessment={assignment} key={i}/>;
                                else
                                    return null;
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }

    examListView() {
        return (
            <div><br/>
                <div className="card">
                    <div className="card-header">
                        <b>Exams</b>
                    </div>
                    <ul className="list-group list-group-flush">
                        {
                            this.state.assessments.map((exam, i) => {
                                if (exam.file_type === 'exam')
                                    return <LinkView  assessment={exam} key={i}/>;
                                else
                                    return null;
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div><br/>
                <h2>Course : {this.state.course.courseName}</h2>
                {this.assignmentListView()}
                {this.examListView()}
                <br/>
            </div>
        );
    }
};