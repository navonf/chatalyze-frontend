import React, { Component } from 'react'
import {Container, Row, Col, Card, CardBody, CardTitle, CardFooter, InputGroup, InputGroupAddon, Button, Input} from 'reactstrap';

class Chat extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            message: '',
            messages: []
        }
    }
    render() {
        return (
            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <CardTitle>Chatalyze</CardTitle>
                        </CardBody>
                        <CardFooter>
                            <InputGroup>
                                <Input placeholder="What's your message?" />
                                <InputGroupAddon addonType="append">
                                    <Button color="primary">Send</Button>
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