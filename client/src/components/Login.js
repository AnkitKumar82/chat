import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withCookies } from "react-cookie";
import Request from 'request';
const myServerAddr = 'http://localhost:5000';
class Login extends Component {
  constructor(props){
    super(props);
    this.socket = props.socket;
    this.state = {
      username: "",
      password: ""
    }
  }
  handleLogin(e) {
      e.preventDefault();
      this.socket.emit('login',{username:this.state.username , password:this.state.password});
      this.socket.on('login_success',(res)=>{
        this.props.cookies.set('user_id',res.user_id);
        this.props.cookies.set('username',res.username);
        window.location.href = '/';
      });
  }
  handleUsernameChange(e){
    console.log(e.target.value);
    this.setState({username: e.target.value});
  }
  handlePasswordChange(e){
    this.setState({password: e.target.value});
  }
  render() {
    return (
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Username" onChange={(e)=>this.handleUsernameChange(e)} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e)=>this.handlePasswordChange(e)} />
        </Form.Group>
        <Button variant="primary" onClick={(e)=>this.handleLogin(e)}>
          Login
        </Button>
      </Form>
    )
  }
}

export default withCookies(Login);

