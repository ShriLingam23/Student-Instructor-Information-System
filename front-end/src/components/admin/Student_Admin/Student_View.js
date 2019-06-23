import React,{Component} from 'react';
import axios from 'axios';
import { Alert,UncontrolledAlert,Button } from 'reactstrap';
import {Link} from 'react-router-dom';

import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';

import Student_Row from './Student_Row';


class Student_View extends Component{

    constructor(props){
        super(props);

        this.state={
            students:[],
            data:[]
        }

        this.fillTable=this.fillTable.bind(this);
        this.checkData= this.checkData.bind(this);
    }

    componentDidMount(){
        axios.get('http://localhost:4000/admin/student/')
            .then(
                students=>{
                    this.setState({students:students.data},()=>{

                        axios.get('http://localhost:4000/admin/course/')
                            .then(
                                courses=>{

                                    let data=[]

                                    for(let i=0;i<courses.data.length;i++){

                                        let num=0;

                                        this.state.students.forEach((student)=>{
                                            
                                            student.courses.forEach((course)=>{
                                                if(courses.data[i]._id==course._id)
                                                    num+=1
                                            })
                                        })

                                        data.push({
                                            name: courses.data[i].courseId, Num: num, amt: 2400,
                                        })
                                    }
                                    this.setState({data:data})
                                }
                            )

                    })
                    
                    console.log(students.data)
                }
                
            )

        
            //console.log(this.state.staffs.length)
    }

    componentWillUpdate(){
        axios.get('http://localhost:4000/admin/student/')
            .then(
                students=>this.setState({students:students.data})
            )
    }

    fillTable(){

        return this.state.students.map(student=>{
            return <Student_Row key={student._id} student={student}/>
        })
    }

    checkData(){
        if(this.state.students.length>0){

            return(
                <div className='container' style={{marginTop:'20px'}}>

                    <BarChart
                        width={800}
                        height={350}
                        data={this.state.data}
                        margin={
                            {
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                        style={{marginLeft:'150px'}}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Num" fill="#8884d8" />
                        {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
                    </BarChart>
                
                    <div className='card'>
                    <table className="table table-hover table-responsive-md table-striped" style={{paddingTop:'50px',marginBottom:'5px'}}>
                        <thead style={{backgroundColor:'#bdbdbd'}}>
                            <tr>
                                <th scope="col">Student Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Password</th>
                                <th scope="col">Contact Number</th>
                                <th scope="col" colSpan='2'></th>
                            </tr>
                        </thead>
                    <tbody>
                        {this.fillTable()}
                    </tbody>
                    </table>
                    </div>
    
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

export default Student_View;