import React,{Component} from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';

import {IoIosEye} from 'react-icons/io'
import {IoIosCloseCircleOutline} from 'react-icons/io'

import ModalImage from 'react-modal-image'

class Notice_Row extends Component{

    constructor(props){
        super(props);

        this.state={
            image:props.image,
            path:""
        }

        this.onDelete=this.onDelete.bind(this);
    }

    componentDidMount(){

        var binary = '';
        var bytes = [].slice.call(new Uint8Array(this.state.image.file.data.data));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        // console.log(window.btoa(binary))
        console.log(this.state.image.file.contentType)

        this.setState({
            path:window.btoa(binary)
        })

    }

    onDelete(){
        axios.delete('http://localhost:4000/admin/file/uploadfile/'+this.state.image._id)
            .then(
                res => {
                    console.log(res.data)
                    this.props.deleted(true);
                }
            )

           
    }

    render(){

        var today = new Date(this.state.image.createdAt);
        var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    
        return(
            <tr>
                <hr className="mb-6"/>
                <img src={`data:${this.state.image.file.contentType};base64,${this.state.path}`} alt='Helpful alt text' height="350px"/>
                <p className="text-muted"><em>Added : {date+" "+time}</em></p>
                <td >
                    <tr>
                        <Button 
                            color="success" 
                            style={{height:'150px',width:'100px',marginTop:'-50px'}} >
                                <IoIosEye size='40px'/> 
                                <ModalImage
                                    large={`data:${this.state.image.file.contentType};base64,${this.state.path}`}
                                    alt="View"
                                    /></Button>
                    </tr>
                    <tr>
                        <Button 
                            color="danger" 
                            style={{height:'150px',width:'100px',marginTop:'20px'}} 
                            onClick={this.onDelete}>
                                <IoIosCloseCircleOutline size='40px'/>Delete</Button>
                    </tr>
                </td>
                
                <hr className="mb-6"/>
            </tr>
        )
    }


}

export default Notice_Row;