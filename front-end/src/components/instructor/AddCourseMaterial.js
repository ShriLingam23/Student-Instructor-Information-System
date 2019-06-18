import React, {Component} from 'react';
import $ from 'jquery';
import axios from "axios";

const BASE_URL = 'http://localhost:4000/';

export default class AddCourseMaterial extends Component {
    state = {
        material_file: '',
        material_data: {
            row_name: '',
            file_name: '',
            file_url: '',
            file_ext: '',
            file_type: 'material',
        }
    };

    componentDidMount() {
        $(".custom-file-input").on("change", function () {
            var fileName = $(this).val().split("\\").pop();
            $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
        });

        $(document).ready(function () {
            $("#reset").click(function () {
                $("#input_File").siblings(".custom-file-label").addClass("selected").html('');
            });
        });
    }

    handleAddSubmit = (e) => {
        e.preventDefault();

        const fd = new FormData();
        fd.append("file", this.state.material_file);

        axios.post(BASE_URL + 'course-views/upload/add', fd, {
            onUploadProgress: progressEvent => {
                console.log('Upload Progress : ' + Math.round((progressEvent.loaded / progressEvent.total) * 100));
            }
        })
            .then(res => {
                let file = this.state.material_file.name.split(".");
                let extension = file[1];

                const newMaterial = {
                    row_name: this.state.material_data.row_name,
                    file_type: this.state.material_data.file_type,
                    file_name: this.state.material_data.file_name,
                    file_url: res.data.file_url,
                    file_ext: extension
                };
                console.log(newMaterial);
                this.setState({
                    material_data: {
                        row_name: this.state.material_data.row_name,
                        file_type: this.state.material_data.file_type,
                        file_name: this.state.material_data.file_name,
                        file_url: res.data.file_url,
                        file_ext: extension
                    }
                });

                axios.post(BASE_URL + 'course-views/', newMaterial)
                    .then(res => {
                        console.log(res.data);
                        this.props.addMaterial(this.state.material_data);
                    });

            }).catch(err => console.log(err.message));

    };


    fileUploadHandler = (e) => {
        this.setState({
            material_file: e.target.files[0]
        })
    };


    onTypeRowNameHandler = (e) => {
        this.setState({
            material_data: {
                row_name: e.target.value,
                file_type: 'material',
                file_name: this.state.material_data.file_name,
            }
        })
    };

    onTypeFileNameHandler = (e) => {
        this.setState({
            material_data: {
                file_name: e.target.value,
                file_type: 'material',
                row_name: this.state.material_data.row_name
            }
        })
    };

    render() {
        return (
            <div className="card">
                <form onSubmit={this.handleAddSubmit}>

                    <div className="form-inline card-header">
                        <h5 className="mt-2">Add Course Material</h5>
                        <div className="ml-auto">
                            <input type="text" className="form-control" onChange={this.onTypeRowNameHandler}
                                   id="add_row"
                                   placeholder="Add Row Name" required/>
                        </div>
                    </div>
                    <br/>
                    <div className="form-group mx-sm-2 ml-2 mr-2">
                        <div className="ml-auto">
                            <input type="text" className="form-control" onChange={this.onTypeFileNameHandler}
                                   id="add_name"
                                   placeholder="Add File Name" required/>
                        </div>
                    </div>

                    <div className="form-group mx-sm-2 ml-2 mr-2">
                        <div className="custom-file">
                            <input type="file"
                                   className="custom-file-input"
                                   onChange={this.fileUploadHandler}
                                   id="input_File"
                                   required/>
                            <label className="custom-file-label form-control">Choose file</label>
                        </div>
                    </div>

                    <div className="col text-center mb-3">
                        <button id="add_material" className="btn btn-primary">
                            Add Material
                        </button>
                        <button type="reset" onClick={this.onReset} id="reset" className="btn btn-info float-right">
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

