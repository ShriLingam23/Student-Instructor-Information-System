import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import {BASE_URL} from '../../..';

export default class StudentNotification extends Component {
    constructor(props) {
        super(props);

        this.state = {
            assessments: []
        }
    }

    componentDidMount() {
        axios.get(BASE_URL + 'students/' + sessionStorage.getItem('userId'))
            .then(response => {
                this.setState({
                    assessments: response.data.data.assessments,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidUpdate() {
        axios.get(BASE_URL + 'students/' + sessionStorage.getItem('userId'))
            .then(response => {
                this.setState({
                    assessments: response.data.data.assessments,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="list-group">
                <br/>
                {
                    this.state.assessments.map((assessment, i) => {
                        return (
                            <div key={i}>
                                <Link to={"/assessments/" + assessment._id}
                                      className="list-group-item list-group-item-action">
                                    <label className="mb-1">You Have A New Assignment : {assessment.link_name}</label>
                                </Link>
                                <br/>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}