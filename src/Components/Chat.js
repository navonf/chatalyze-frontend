import React, { Component } from 'react'
import {Container, Row, Col, Card, CardBody, CardTitle, CardFooter, InputGroup, InputGroupAddon, Button, Input} from 'reactstrap';
import io from 'socket.io-client';

class Chat extends Component {
    constructor(props){
        super(props);
        this.state = {
            message: '',
            messages: []
        }
        this.socket = io('https://api-chatalyze.herokuapp.com');
        this.socket.on('RECIEVE_MESSAGE', (data) => {
            addMessage(data);
        });
        this.sendMessage = (e) => {
            e.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                author: this.props.location.state.username,
                message: this.state.message
            })
            this.setState({
                message: ''
            })
        }

        const addMessage = (data) => {
            this.setState({
                messages: [
                    ...this.state.messages,
                    data
                ]
            })
        }
    }

    grabInput = (e) => {
        this.setState({
            message: e.target.value
        })
    }

    render() {
        return (
            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <CardTitle>Hello, {this.props.location.state.username}</CardTitle>
                            <hr />
                            <div className="messages">
                                {
                                    this.state.messages.map((message, index) => {
                                        return(
                                            <div key={index}>
                                                {message.author}: {message.message}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </CardBody>
                        <CardFooter>
                            <InputGroup>
                                <Input placeholder="What's your message?" onChange={(e) => this.grabInput(e)}/>
                                <InputGroupAddon addonType="append">
                                    <Button outline color="primary" onClick={this.sendMessage}>Send</Button>
                                </InputGroupAddon>
                            </InputGroup>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default Chat;