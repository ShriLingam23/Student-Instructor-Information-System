import React,{Component} from 'react';
import axios from 'axios';


import {IoIosPerson} from "react-icons/io"
import {IoIosContact} from "react-icons/io"
import {IoIosKey} from "react-icons/io"
import {MdPhone} from "react-icons/md"
import {IoIosMail} from "react-icons/io"
import {IoIosBook} from "react-icons/io"

import {FiUserCheck} from 'react-icons/fi'

import Student_Course_Row from './Student_Course_Row'

class Student_Profile extends Component{

    constructor(props) {
        super(props);
        
        this.state = { 
            visible: false,
            fullName:"",
            email:"",
            password:"",
            contactNum:"",
            courses:[]

        };


        this.onValueChange = this.onValueChange.bind(this);
        this.fillCourse= this.fillCourse.bind(this);
        this.toBack= this.toBack.bind(this);
    }

    componentDidMount(){

        axios.get('http://localhost:4000/admin/student/edit/'+this.props.match.params.id)
            .then(
                student =>{
                    this.setState({
                        fullName:student.data.fullName,
                        email:student.data.email,
                        password:student.data.password,
                        contactNum:student.data.contactNum,
                        courses:student.data.courses
                    })

                    console.log(student.data)
                }

                
            )

    }

    onDismiss() {
        this.setState({ visible: false });
    }

    onValueChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    toBack(){
        this.props.history.push('/student/view/')
    }

    fillCourse(){
        return this.state.courses.map((course)=>{
            return(
                <Student_Course_Row key={course._id} course={course}/>
            )
        })
    }

    showPass(){
        var x = document.getElementById("enrollment");
        x.type="text";
    }

    hidePass(){
        var x = document.getElementById("enrollment");
        x.type="password";
    }

    render(){
        return(
            <div className="container" style={{paddingTop:'20px'}}>

                <main role="main" style={{marginTop:'10px'}}>

                    <section className="jumbotron text-center" >
                        <div className="container" style={{backgroundColor:'#f9fbe7',marginTop:'-30px',marginBottom:'-30px'}}>

                            <div className='row' >
                                <div className='col-md-4 bg-info text-white text-center'>
                                    <div className="card-body" >
                                    <FiUserCheck size="200px" style={{paddingTop:'50px'}}/>
                                        <h2 className="py-3">Profile</h2>
                                        <p>
                                        Elective/Humanity Registration Course Web Student Profile Official Requests ... Life at LOOPs promises a vibrant future for our students. Student interactive communities, clubs & societies, sports and competitions

                                        </p>
                                    </div>
                                </div>

                                {/* form section */}
                                <div className="col-md-8 py-5 border">
                                    <div className="pb-4 form-control bg-dark text-info text-light" style={{marginBottom:'20px',height:'50px'}}><h4><IoIosContact size='40px'/> Student Profile Information</h4></div>
                                    <form id='staffForm'>
                                        <div className="form-row">
                                            <div className="input-group form-group col-md-6">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text"><IoIosPerson/></div>
                                                </div>
                                                <input 
                                                    name="fullName" 
                                                    placeholder="Student Name" 
                                                    className="form-control" 
                                                    readOnly
                                                    type="text"
                                                    onChange={this.onValueChange}
                                                    value={this.state.fullName} />
                                            </div>
                                            <div className="input-group form-group col-md-6">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text"><IoIosMail/></div>
                                                </div>
                                                <input 
                                                    name="courseName" 
                                                    placeholder="Course Name"
                                                    className="form-control"
                                                    readOnly
                                                    type="text"
                                                    onChange={this.onValueChange}
                                                    value={this.state.email} />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="input-group form-group col-md-6">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text"><IoIosKey/></div>
                                                </div>
                                                <input
                                                    id="enrollment"  
                                                    name="enrollment" 
                                                    placeholder="Enrollment Key" 
                                                    className="form-control" 
                                                    readOnly
                                                    type="password"
                                                    value={this.state.password} 
                                                    onMouseOver={this.showPass.bind(this)}
                                                    onMouseOut={this.hidePass.bind(this)}/>
                                            </div>
                                            <div className="input-group form-group col-md-6">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text"><MdPhone/></div>
                                                </div>
                                                <input 
                                                    name="courseName" 
                                                    placeholder="Course Name"
                                                    className="form-control"
                                                    readOnly
                                                    type="text"
                                                    onChange={this.onValueChange}
                                                    value={this.state.contactNum} />
                                            </div>
                                        </div>
                                        

                                        <div className="form-row">
                                            <div className="input-group form-group col-md-12">
                                                <div className="form-control bg-dark text-info text-light" style={{height:'45px',marginTop:'20px'}}>  
                                                    <h4><IoIosBook size="30px" style={{marginRight:'10px'}}/>Enrolled Courses</h4>
                                                    
                                                    
                                    
                                                </div>
                                                <table className="table table-hover table-responsive-md " style={{marginTop:'5px',marginBottom:'5px'}}>
                                                        <thead >
                                                            <tr>
                                                                <th scope="col">Course ID</th>
                                                                <th scope="col">Course Name</th>
                                                                <th scope="col">Faculty</th>
                                                                <th scope="col">Year</th>
                                                                <th scope="col">Semester</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.fillCourse()}
                                                        </tbody>
                                                    </table>
                                                
                                            </div>
                                        </div>
                                        
                                        <div className="form-row" style={{display:'flex',justifyContent:'center'}}>
                                            <button role='button' className="btn btn-danger" onClick={this.toBack}>Back</button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    
                    </section>
                </main>

            </div>
        );
    }
}

export default Student_Profile;