import React,{Component} from 'react';
import axios from 'axios';
import { Alert,UncontrolledAlert,Button } from 'reactstrap';
import {Link} from 'react-router-dom'

import { PieChart, Pie, Sector } from 'recharts';
import {TiFilter,TiRefresh} from 'react-icons/ti';

import StaffTable from './Staff_Table';


//Data Visualization
  
const renderActiveShape = (props) => {

    const RADIAN = Math.PI / 180;
    const {
      cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
      fill, payload, percent, value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
  
    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill="#b12000">{payload.name}</text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill="#f18407"
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill="#fcd238"
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill="#b12000" stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#383645" style={{fontStyle:'bold'}}>
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
};

class Staff_View extends Component{

    constructor(props){
        super(props);

        this.state={
            staffs:[],
            activeIndex: 0,
            data:[],
            filteredStaff:[]
        }

        this.fillTable=this.fillTable.bind(this);
        this.checkData= this.checkData.bind(this);

        this.resetStaff =this.resetStaff.bind(this);
        this.filterStaff = this.filterStaff.bind(this);

    }

    componentDidMount(){

        axios.get('http://localhost:4000/admin/staff/')
            .then(
                staffs=>{
                    this.setState({staffs:staffs.data,filteredStaff:staffs.data})

                    let SeniorLecturer =0;
                    let Lecturer =0;
                    let Instructor =0;
                    let LabAssistant =0;
                    let Admin =0;

                    staffs.data.forEach((staff)=>{
                        console.log(staff.profession)
                        switch(staff.profession){
                            case 'Senior Lecturer':
                                SeniorLecturer=+1;
                                break;
                            case 'Lecturer':
                                Lecturer=+1;
                                break;
                            case 'Instructor':
                                Instructor=+1;
                                break;
                            case 'Lab Assistant':
                                LabAssistant=+1;
                                break;
                            case 'Admin':
                                Admin=+1;
                                break;
                        }
                    })
                    console.log(SeniorLecturer,Lecturer,LabAssistant,Instructor,Admin)

                    const data = [
                        { name: 'Admin', value: Admin },
                        { name: 'Senior Lecturer', value: SeniorLecturer },
                        { name: 'Lecturer', value: Lecturer },
                        { name: 'Instructor', value: Instructor },
                        { name: 'Lab Assistant', value: LabAssistant }
                    ]

                    this.setState({data:data})
                    
                    console.log(data)

                }
            )
    }

    componentWillUpdate(){
        axios.get('http://localhost:4000/admin/staff/')
            .then(
                staffs=>{
                    this.setState({staffs:staffs.data})            
                }
            )

    }

    fillTable(){

        if(this.state.filteredStaff.length!=0){
            return (
                <div className='card' style={{marginTop:'30px'}}>
                    <table className="table table-hover table-responsive-md table-striped" style={{marginBottom:'5px'}}>
                        <thead style={{backgroundColor:'#bdbdbd'}}>
                            <tr>
                                <th scope="col">Staff Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Profession</th>
                                <th scope="col">Contact Number</th>
                                <th scope="col">Location</th>
                                <th scope="col" colSpan='2'></th>
                            </tr>
                        </thead>
                    <tbody>
                        {
                            this.state.filteredStaff.map(staff=>{
                                return <StaffTable key={staff._id} staff={staff}/>
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

    onPieEnter = (data, index) => {
        this.setState({
          activeIndex: index,
        });
    };

    resetStaff(){
        this.setState({filteredStaff:this.state.staffs})
        const staffOption = document.getElementById("staff");
        staffOption.selectedIndex=0;
    }

    filterStaff(){
        const staffOption = document.getElementById("staff");
        const index = staffOption.selectedIndex;

        console.log(index)

        if(index!=0){

            let filteredStaff= this.state.staffs.filter(staff=>{
                console.log(staff.profession)
                switch(staff.profession){
                    case 'Admin':
                        if(index==1)
                            return staff;

                        break;

                    case 'Senior Lecturer':
                            if(index==2)
                                return staff;
    
                            break;

                    case 'Lecturer':
                            if(index==3){
                                // console.log('Lecturer')
                                return staff
                            }
                            console.log('Lecturer')
                            break;

                    case 'Instructor':
                            if(index==4)
                                return staff;
    
                            break;

                    case 'Lab Assistant':
                            if(index==5)
                                return staff;
    
                            break;
                }
                
            })
            console.log(filteredStaff)
            this.setState({filteredStaff:filteredStaff})

        }

    }

    checkData(){
        if(this.state.staffs.length>0){

            return(
                <div className='container' >

                    <PieChart width={800} height={420} style={{marginLeft:'250px'}}>
                        <Pie 
                            activeIndex={this.state.activeIndex}
                            activeShape={renderActiveShape} 
                            data={this.state.data} 
                            cx={300} 
                            cy={200} 
                            innerRadius={100}
                            outerRadius={150} 
                            fill="#db5400"
                            onMouseEnter={this.onPieEnter}  
                        />
                    </PieChart>

                    <div className="row">
                        <div className="col-md-8">
                            <select className="form-control" id="staff">
                                <option>Choose a Profession...</option>
                                <option>Admin</option>
                                <option>Senior Lecturer</option>
                                <option>Lecturer</option>
                                <option>Instructor</option>
                                <option>Lab Assistant</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-warning form-control" onClick={this.filterStaff}>Filter <TiFilter size='30px'/></button>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-danger form-control" onClick={this.resetStaff}>Reset <TiRefresh size='30px'/></button>
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
                        <Link to='/staff/add'><Button color="info">Add a New Staff</Button></Link>
                    </div>
                </div>
            )
        }
    }


    render(){
        return this.checkData()
    }


}

export default Staff_View;