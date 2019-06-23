import React,{Component} from 'react';

class Student_Course_Row extends Component{

    constructor(props){
        super(props);

        this.state={
            course:props.course
        }
    }

    render(){
        return(
            <tr>
                <th scope="row">{this.state.course.courseId}</th>
                <td scope="col">{this.state.course.courseName}</td>
                <td scope="col">{this.state.course.faculty}</td>
                <td scope="col">{this.state.course.year}</td>
                <td scope="col">{this.state.course.semester}</td>
                
            </tr>
        )
    }


}

export default Student_Course_Row;