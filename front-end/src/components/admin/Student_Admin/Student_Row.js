import React,{Component} from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Student_Row extends Component{

    constructor(props){
        super(props);

        this.state={
            student:props.student
        }

        this.onDelete=this.onDelete.bind(this);
    }

    onDelete(){
        axios.get('http://localhost:4000/admin/student/delete/'+this.state.student._id)
            .then(
                res => console.log(res.data)
            )
    }

    render(){
        return(
            <tr>
                <th scope="row">{this.state.student.fullName}</th>
                <td scope="col">{this.state.student.email}</td>
                <td scope="col">{this.state.student.password}</td>
                <td scope="col">{this.state.student.contactNum}</td>
                <td scope="col"><Link to={'/student/edit/'+this.state.student._id}><Button color="info">View</Button></Link></td>
                <td scope="col"><Button color="danger" onClick={this.onDelete}>Disable</Button></td>
            </tr>
        )
    }


}

export default Student_Row;