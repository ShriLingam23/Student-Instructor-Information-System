import React,{Component} from 'react';
import {Link} from 'react-router-dom'
import { Collapse, Button } from 'reactstrap';

import logo from '../components/logo.svg'

class Header extends Component{

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
    }

    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
    }

    render(){
        return(
            <div className="container">
                <header>
                    
                    <div className="navbar navbar-dark bg-dark shadow-sm">
                        <div className="container d-flex justify-content-between">
                            <Link className="navbar-brand" to='/'>
                                <img src={logo} width="30" height="30" className="d-inline-block align-top" alt=""/>
                                Loops' Student Portal
                            </Link>

                            <Button className="navbar-toggler-icon" color="primary" onClick={this.toggle} ></Button>
                            <Collapse isOpen={this.state.collapse}>
                                <div className="container">
                                    <hr className="col-md-6" color='white'/>
                                    <div className="row">
                                        <div className="col-sm-8 col-md-7 py-4">
                                            <h4 className="text-white">About</h4>
                                            <p className="text-muted">Add some information about the album below, the author, or any other background context. Make it a few sentences long so folks can pick up some informative tidbits. Then, link them off to some social networking sites or contact information.</p>
                                        </div>
                                        <div className="col-sm-4 offset-md-1 py-4">
                                            <h4 className="text-white">Contact</h4>
                                            <ul className="list-unstyled">
                                                <li><a href="#" className="text-white">Follow on Twitter</a></li>
                                                <li><a href="#" className="text-white">Like on Facebook</a></li>
                                                <li><a href="#" className="text-white">Email me</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    
                                </div>
                            </Collapse>
                        </div>
                    </div>
                </header>
            </div>
        )
    }


}

export default Header;