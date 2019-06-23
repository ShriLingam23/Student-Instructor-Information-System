import React,{Component} from 'react';
import axios from 'axios';
import { Alert,UncontrolledAlert,Button } from 'reactstrap';
import {Link} from 'react-router-dom'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';
import {TiFilter,TiRefresh} from 'react-icons/ti';
import CourseTable from './Course_Table';

class Course_View extends Component{
    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

    constructor(props){
        super(props);

        this.state={
            courses:[],
            students:[],
            data:[],
            option:'',
            filteredCourse:[]
        }

        this.fillTable=this.fillTable.bind(this);
        this.checkData= this.checkData.bind(this);

        this.optionSelected=this.optionSelected.bind(this)
        this.fillOptions=this.fillOptions.bind(this);

        this.resetCourse =this.resetCourse.bind(this);
        this.filterCourse = this.filterCourse.bind(this);
    }

    componentDidMount(){
        axios.get('http://localhost:4000/admin/course/')
            .then(
                courses=>{
                    this.setState({courses:courses.data,filteredCourse:courses.data},()=>{

                        console.log(this.state.courses)
                        axios.get('http://localhost:4000/admin/student/')
                        .then(
                            students=>{
                                this.setState({students:students.data},()=>{

                                    let data=[]
                                    this.state.courses.forEach((course)=>{

                                        let Stu_Num=0;
                                        let Staff_Num=course.staffs.length;

                                        this.state.students.forEach((student)=>{
                                            
                                            student.courses.forEach((Stu_course)=>{
                                                if(course._id==Stu_course._id)
                                                    Stu_Num+=1
                                            })
                                        })

                                        data.push({
                                            name: course.courseId, staffs: Staff_Num, students: Stu_Num, amt: 2400,
                                          })
                                    })
                                    console.log(data)
                                    this.setState({data:data})
                                })
                            })
                    })



                }
            )

            //console.log(this.state.staffs.length)
    }

    componentWillUpdate(){
        axios.get('http://localhost:4000/admin/course/')
            .then(
                courses=>this.setState({courses:courses.data})
            )
    }

    fillTable(){

        if(this.state.filteredCourse.length!=0){
            return(
                <div className='card' style={{marginTop:'25px'}}>
                        <table className="table table-hover table-responsive-md table-striped" style={{marginBottom:'5px'}}>
                            <thead style={{backgroundColor:'#bdbdbd'}}>
                                <tr>
                                    <th scope="col">Course ID</th>
                                    <th scope="col">Course Name</th>
                                    <th scope="col">Enrollment Key</th>
                                    <th scope="col">Faculty</th>
                                    <th scope="col">Year</th>
                                    <th scope="col">Semester</th>
                                    <th scope="col" colSpan='2'></th>
                                </tr>
                            </thead>
                        <tbody>
                            {
                                this.state.filteredCourse.map(course=>{
                                    return <CourseTable key={course._id} course={course}/>
                                })
                            }
                        </tbody>
                        </table>
                        </div>
            )
        }
        else{
            return(
                <div className='container' style={{marginTop:'20px'}}>
                    <UncontrolledAlert color="warning">
                        <h4 className="alert-heading">No Data Available</h4>
                        <p>
                        Aww yeah, you successfully read this important alert message. This example text is going
                        to run a bit longer so that you can see how spacing within an alert works with this kind
                        of content.
                        </p>
                        <hr />
                        <p className="mb-0">
                        Whenever you need to, be sure to use margin utilities to keep things nice and tidy.
                        </p>
                    </UncontrolledAlert>
                    
                </div>
            )
        }
         
    }

    optionSelected(){
        const staffOption = document.getElementById("filterOpt");
        const index = staffOption.selectedIndex;

        if(index==0)
            this.setState({option:''})
        else if(index==1)
            this.setState({option:'Faculty'})
        else if(index==2)
            this.setState({option:'Year'})

    }

    fillOptions(){
        switch(this.state.option){
            case '':
                return (
                    <select className="form-control">
                        <option>Please select a option to filter</option>
                    </select>
                )

            case 'Faculty':
                return (
                    <select name="faculty" className="form-control" id="faculty">
                        <option selected>Choose Faculty ...</option>
                        <option> Computing Faculty</option>
                        <option> Engineering Faculty</option>
                        <option> Business Faculty</option>
                        <option> Science Faculty</option>
                    </select>
                )

            case 'Year':
                    return (
                        <select name="year" className=" form-control" id="year">
                            <option selected>Choose a Year ...</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select>
                    )
                    
                
        }
    }

    filterCourse(){

        if(this.state.option!=''){
            if(this.state.option=='Faculty'){
                const facultyOption = document.getElementById("faculty");
                const fi = facultyOption.selectedIndex;

                console.log(fi)
                var filteredCourse=this.state.courses.filter((course)=>{

                    switch(fi){

                        case 1:
                            if(course.faculty=='Computing Faculty'){
                                console.log("Engineer")
                                return course;
                            }
                            break;
                                

                        case 2:
                            if(course.faculty=="Engineering Faculty"){
                                // console.log("Engineer")
                                return course;
                            } 
                            break;                               

                        case 3:
                            if(course.faculty=="Business Faculty")
                                return course;
                            
                            break;

                        case 4:
                            if(course.faculty=="Science Faculty")
                                return course;
                                break;

                    }

                })
            }
            else{

                const yearOption = document.getElementById("year");
                const fi1 = yearOption.selectedIndex;

                console.log(fi1)
                var filteredCourse=this.state.courses.filter((course)=>{

                    switch(course.year){

                        case 1:
                            if(fi1==1)
                                return course;
                            break;

                        case 2:
                            if(fi1==2)
                                return course;
                            break;

                        case 3:
                            if(fi1==3)
                                return course;
                            break;

                        case 4:
                            if(fi1==4)
                                return course;
                            break;

                    }

                })

            }
        console.log(filteredCourse)
        this.setState({filteredCourse:filteredCourse})    
        }

    }

    resetCourse(){
        this.setState({option:''})

        const staffOption = document.getElementById("filterOpt");
        staffOption.selectedIndex=0;

        this.setState({filteredCourse:this.state.courses})
    }

    checkData(){
        if(this.state.courses.length>0){

            return(
                <div className='container' style={{marginTop:'20px'}}>

                    <LineChart
                        width={800}
                        height={340}
                        data={this.state.data}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                        style={{marginLeft:'150px'}}
                        fill="#8884d8"
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" stroke="#000"/>
                        <YAxis stroke="#000"/>
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="staffs" stroke="#db5400" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="students" stroke="#f5a800" />

                    </LineChart>

                    <div className="row" style={{marginTop:'20px'}}>
                        <div className="col-md-4">
                            <select className="form-control" id="filterOpt" onClick={this.optionSelected}>
                                <option>Choose a option...</option>
                                <option>Faculty</option>
                                <option>Academic Year</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            {this.fillOptions()}
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-warning form-control" onClick={this.filterCourse}>Filter <TiFilter size='30px'/></button>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-danger form-control" onClick={this.resetCourse}>Reset <TiRefresh size='30px'/></button>
                        </div>
                    </div>
                
                    {this.fillTable()}
                </div>
            )

        }
        else{
            return(
                <div className='container' style={{marginTop:'150px'}}>
                    <UncontrolledAlert color="warning">
                        <h4 className="alert-heading">No Data Available</h4>
                        <p>
                        Aww yeah, you successfully read this important alert message. This example text is going
                        to run a bit longer so that you can see how spacing within an alert works with this kind
                        of content.
                        </p>
                        <hr />
                        <p className="mb-0">
                        Whenever you need to, be sure to use margin utilities to keep things nice and tidy.
                        </p>
                    </UncontrolledAlert>
                    <br></br>
                    <div style={{display:'flex',justifyContent:'center'}}>
                        <Link to='/course/add'><Button color="info">Add a New Course</Button></Link>
                    </div>
                </div>
            )
        }
    }

    render(){
        return this.checkData()
    }


}

export default Course_View;