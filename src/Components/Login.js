import React, { Component } from 'react';
import { Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';


class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            modal: true,
            login: false,
            register: false
        }
    }
    render() {
        return (
            <div style={{backgroundColor: "#2c3030b8", height:"100vh"}}>
                <Modal style={{top: "20%"}} isOpen={this.state.modal}>
                    <ModalHeader>
                        <span style={{fontSize: "45px", color: "black"}}>
                        chatalyze
                        </span>
                    </ModalHeader>
                    <ModalBody>
                        yeet
                    </ModalBody>
                    <ModalFooter>
                        <a href="/" className="btn btn-outline-primary mr-2" role="button">
                            Login
                        </a>
                        <a href="/">
                            Create an Account
                        </a>
                    </ModalFooter>
                </Modal>
        </div>
        )
    }
}

export default Login;
