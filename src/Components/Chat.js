import React, { Component } from 'react'
import {Row, Col, Card, CardBody, CardTitle, CardFooter, InputGroup, InputGroupAddon, Button, Input} from 'reactstrap';
import io from 'socket.io-client';
const empty_string = '';

class Chat extends Component {
    constructor(props){
        super(props);
        this.state = {
            message: '',
            messages: [],
            user_joined: [],
            user_disconnected: [],
            chat_key: ''
        }
        this.socket = io('https://api-chatalyze.herokuapp.com');
        this.socket.emit('SEND_USERNAME', this.props.location.state.username);
        this.socket.on('USER_ADDED', (data) => {
            var users = this.state.user_joined
            users.push(data);
            this.setState({
                user_joined: users
            });
        })
        this.socket.on('RECIEVE_MESSAGE', (data) => {
            addMessage(data);
        });
        this.socket.on('CHAT_KEY', (data) => {
            this.setState({
                chat_key: data
            }, () => console.log('key '+ this.state.chat_key));
        });
        // this.socket.on('WHO_DISCONNECTED', () => {
        //     this.socket.emit('THIS_PERSON', this.props.location.state.username);
        // })
        // this.socket.on('PERSON_DISCONNECTED', data => {
        //     var users_disc = this.state.user_disconnected;
        //     users_disc.push(data);
        //     this.setState({
        //         user_disconnected: users_disc
        //     })
        // })
        this.sendMessage = (e) => {
            e.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                author: this.props.location.state.username,
                message: this.state.message
            })
            this.sendTranscript();
            const q = document.getElementById('input_message');
            q.value = '';
        }

        const addMessage = (data) => {
            this.setState({
                messages: [
                    ...this.state.messages,
                    data
                ]
            });
        }
    }

    sendTranscript() {
        var obj = {
            key: this.state.chat_key,
            user: this.props.location.state.username,
            message: this.state.message
        } 
        fetch('https://api-chatalyze.herokuapp.com/conversation/update_transcript', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => console.log(res.status));
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
                                    this.state.user_joined.map((user, index) => {
                                        return(
                                            <div key={index} style={{color:'#ED1137'}}>
                                                {user}{' '}has entered the chat.
                                            </div>
                                        )
                                    })
                                }
                                 {
                                    this.state.user_disconnected.map((user, index) => {
                                        return(
                                            <div key={index} style={{color:'#ED1137'}}>
                                                {user}{' '}has left the chat.
                                            </div>
                                        )
                                    })
                                }
                                {
                                    this.state.messages.map((message, index) => {
                                        var back_color = '';
                                        var text_color = ''
                                        {
                                            index % 2 === 0 ? back_color = '#1387FD' : back_color = '#E5E5EB'
                                        }
                                        {
                                            index % 2 === 0 ? text_color = 'white' : text_color = 'black'
                                        }
                                        return(
                                            <div key={index}>
                                                <span style={{fontSize:"1.5rem"}}>{message.author}</span>:{' '} 
                                                <span class="rounded-pill px-2 pb-1" style={{backgroundColor:`${back_color}`, color:`${text_color}`, fontSize:"1.5rem"}}>{message.message}</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </CardBody>
                        <CardFooter>
                            <InputGroup>
                                <Input placeholder="What's your message?" id="input_message" onChange={(e) => this.grabInput(e)}/>
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