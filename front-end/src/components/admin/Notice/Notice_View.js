import React,{Component} from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {IoIosNotificationsOutline} from 'react-icons/io'
// import {Link} from 'react-router-dom'

import 'filepond/dist/filepond.min.css';
import { FilePond, registerPlugin } from 'react-filepond';

//import and register the image preview plugin.
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

import Swal from 'sweetalert2'

import Notice_Row from './Notice_Row';
registerPlugin(FilePondPluginImagePreview);

class Notice_View extends Component{

    constructor(props) {
        super(props);
        this.state = {
          modal: false,
          id:'',
          images:[]
        };
    
        this.toggle = this.toggle.bind(this);
        this.fillNotices = this.fillNotices.bind(this);
    }

    componentDidMount(){
        axios.get('http://localhost:4000/admin/file/uploadfile')
          .then(
            (res)=>{
              console.log(res)
              this.setState({
                images:res.data
              },()=>{
                console.log(this.state.images)
              })
            }
          )
      }

    toggle(e) {
        if(e.target.name=='save'){
          if(this.state.id!=''){
            this.setState(prevState => ({
              modal: !prevState.modal
            }));
    
            axios.get('http://localhost:4000/admin/file/uploadfile')
              .then(
                (res)=>{
                  this.setState({
                    images:res.data
                  },()=>{
                    console.log(this.state.images)
                  })
                }
              )

              Swal.fire(
                'Good job!',
                'Notice Successfully published!',
                'success'
              )
          }
          else{
            Swal.fire({
              title: 'Error!',
              text: 'Please select the Notice to be Uploaded',
              type: 'error',
              confirmButtonText: 'Close'
            })
          }
        }
        else{
          this.setState(prevState => ({
            modal: !prevState.modal
          }));
  
          axios.get('http://localhost:4000/admin/file/uploadfile')
            .then(
              (res)=>{
                this.setState({
                  images:res.data
                },()=>{
                  console.log(this.state.images)
                })
              }
            )

        }
    }

    handlePondFile(error, file) {
        if (error) {
            console.log('Oh no');
            return;
        }
        const fileId = JSON.parse(file.serverId)
        console.log('File added', fileId.id);
        this.setState({id:fileId.id})
        console.log(this.state.id)

    }

    handleRemove(error, file) {
        if (error) {
            console.log('Oh no');
            return;
        }
        console.log('File Removed', this.state.id);
        axios.delete('http://localhost:4000/admin/file/uploadfile/'+this.state.id)
            .then(
                (res)=> console.log(res.data)
            )
    }

    resetNotice(bool){
      console.log(bool)
      axios.get('http://localhost:4000/admin/file/uploadfile')
          .then(
            (res)=>{
              this.setState({
                images:res.data
              },()=>{
                console.log(this.state.images)
              })
            }
          )
    }

    fillNotices(){
        return this.state.images.map((image)=>{
            return <Notice_Row key={image._id} image={image} deleted={this.resetNotice.bind(this)}/>
        })
    }
    
    render() {
        return (
            <div style={{display:'flex',justifyContent:'center'}}>
                

                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Add a New Notification</ModalHeader>
                    <ModalBody>
                    <FilePond 
                        onprocessfile={this.handlePondFile.bind(this)}
                        onremovefile={this.handleRemove.bind(this)}
                        name={"file"}
                        server="http://localhost:4000/admin/file/uploadfile"/>
                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" onClick={this.toggle} name='save'>Save changes</Button>{' '}
                    <Button color="secondary" onClick={this.toggle} name='cancle'>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <table >
                    <tr >
                      <td style={{paddingLeft:'200px'}}><Button color="warning" onClick={this.toggle}><IoIosNotificationsOutline size="30px"/> Add a Notification</Button></td>
                    </tr>
                    {this.fillNotices()}
                </table>

            </div>
        );
    }
    


}

export default Notice_View;