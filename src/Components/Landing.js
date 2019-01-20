import React, { Component } from 'react';
import { DialogContainer, TextField, Button } from 'react-md';
import {Row, Col, Alert} from 'reactstrap';
import ReactTyped from 'react-typed';
import { MdRemoveRedEye } from 'react-icons/md';
import { Redirect } from 'react-router-dom';
import '../styles.css';

class Landing extends Component {
  constructor(props){
    super(props);
    this.state = {
        visible: false,
        login: false,
        register: false,
        username: '',
        password: '',
        verified: false,
        redirect: false,
        invalid: false
    }
  }

  sendInfo(param) {
    const userObj = {
      username: this.state.username,
      password: this.state.password
    }
    fetch('https://api-chatalyze.herokuapp.com/user/add_user', {
      method: 'POST',
      body: JSON.stringify(userObj),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
    .then(resJSON => console.log(resJSON))
    .catch(error => console.error('Error:', error));
    this.setState({
      [param]: false
    });
  }

  show = () => {
    this.setState({
      visible: true
    });
  };

  hide = () => {
    this.setState({
      visible: false,
      register: false,
      register: false
    });
  };

  toggleLogin = () => {
    this.setState({
      login: true,
      register: false
    })
  }

  toggleRegister = () => {
    this.setState({
      login: false,
      register: true
    })
  }

  redirectTo() {
    if(this.state.redirect){
      return(
        <Redirect to={{
          pathname: '/chat',
          state: {username: this.state.username}
        }}/>
      )
    }
  }

  verifyLogin() {
    const userObj = {
      username: this.state.username,
      password: this.state.password
    }
    fetch('https://api-chatalyze.herokuapp.com/user/login', {
      method: 'POST',
      body: JSON.stringify(userObj),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if(res.status){
        this.setState({
          verified: true,
          redirect: true
        });
      }
    })
  }

  setInput = (param, e) => {
    this.setState({
      [param]: e
    })
  }

  render() {
    const { visible } = this.state;
    const actions = [{
      onClick: this.toggleLogin,
      primary: true,
      children: 'Login',
      style: {margin: "auto"}
    },
    {
      onClick: this.toggleRegister,
      primary: true,
      children: 'Register',
      style: {margin: "auto"}
    },{
      onClick: this.hide,
      primary: false,
      secondary: true,
      children: 'Cancel',
      style: {margin: "auto"}
    }];
    return (
      <div style={{backgroundColor: "#202424", height:"100vh"}}>
      <DialogContainer
          id={1}
          visible={visible}
          title="Think before you speak."
          onHide={this.hide}
          modal
          actions={actions}
          className="login-font"
        >
            {
              this.state.login ?
              <p>
                <TextField
                  id="floating-center-title"
                  label="Username"
                  lineDirection="center"
                  placeholder="i.e. JohnSmith123"
                  className="md-cell md-cell--12"
                  onChange={(e) => this.setInput("username", e)}
                />
                <TextField
                  id="floating-password"
                  label="Password"
                  lineDirection="center"
                  placeholder="i.e. johnsmith123"
                  className="md-cell md-cell--12"
                  type="password"
                  passwordIcon={<MdRemoveRedEye />}
                  onChange={(e) => this.setInput("password", e)}
                />
                <div className="center-screen">
                  <Button raised primary onClick={() => this.verifyLogin()}>Submit</Button>
                </div>
              </p> : null
            }
            {
              this.state.register ?
              <p>
                <Row form>
                <Col md={6}>
                <TextField
                  id="floating-center-title"
                  label="First"
                  lineDirection="center"
                  placeholder="i.e. John"
                  className="md-cell md-cell--12"
                />
                </Col>
                <Col md={6}>
                  <TextField
                    id="floating-center-title"
                    label="Last"
                    lineDirection="center"
                    placeholder="i.e. Smith"
                    className="md-cell md-cell--12"
                  />
                </Col>
                </Row>
                <Row form>
                  <TextField
                      id="floating-center-title"
                      label="Email"
                      lineDirection="center"
                      placeholder="i.e. JohnSmith123@gmail.com"
                      className="md-cell md-cell--12"
                  />
                </Row>
                <Row form>
                  <TextField
                      id="floating-center-title"
                      label="Username"
                      lineDirection="center"
                      placeholder="i.e. JohnSmith123"
                      className="md-cell md-cell--12"
                      onChange={(e) => this.setInput("username", e)}
                  />
                </Row>
                <Row form>
                  <TextField
                      id="floating-password"
                      label="Password"
                      lineDirection="center"
                      placeholder="i.e. johnsmith123"
                      className="md-cell md-cell--12"
                      type="password"
                      passwordIcon={<MdRemoveRedEye />}
                      onChange={(e) => this.setInput("password", e)}
                  />
                </Row>
                <div className="center-screen">
                  <Button raised primary onClick={() => this.sendInfo("register")}>Submit</Button>
                </div>
              </p> : null
            }
            {
              this.state.invalid ?
              <Alert color="danger">
                INCORRECT PASSWORD
              </Alert> : null
            }
            {this.redirectTo()}
        </DialogContainer>
        <div className="mx-auto text-center landing" onClick={this.show}>
          <h1 className="mx-auto mb-0 landing-font">chatalyze
            <span><img src="chat.png" height="90"/></span>
          </h1>
          <div className="mx-auto text-center landing-text">
          <ReactTyped
            strings={["an app to prevent bullying", "an app to prevent abuse", "an app to prevent violence", "an app to prevent harassment", "an app to create a better workplace."]}
            typeSpeed={60}
            backSpeed={90}
            backDelay={1}
            smartBackspace={true}
            className="typedjs-font"
          />
          </div>
        </div>
      </div>
    )
  }
}

export default Landing;
