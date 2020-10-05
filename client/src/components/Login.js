import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { withCookies } from "react-cookie";
class Login extends Component {
  constructor(props){
    super(props);
    this.socket = props.socket;
    this.state = {
      username: "",
      password: "",
      errorMessage: "Username or password wrong!",
      errorStatus:false
    }
  }
  componentDidMount(){
    this.socket.on('login_success',(res)=>{
      if(res.status===false){
        this.setState({
          errorStatus:true,
          errorMessage:res.errorMessage
        });
      }else{
        this.setState({
          errorStatus:false
        });
        console.log("token generated",res.user_id);
        this.props.cookies.set('user_id',res.user_id);
        this.props.cookies.set('username',res.username);
        this.props.handleTokenVerificationSuccess();
      }
    });
  }
  handleLogin(e) {
      e.preventDefault();
      this.socket.emit('login',{username:this.state.username , password:this.state.password});
      
  }
  handleNewUser(e) {
    e.preventDefault();
    this.socket.emit('new_user',{username:this.state.username , password:this.state.password});
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
      <div style={{margin:'auto',width:'60%'}}>
        <Form style={{marginTop:"10%"}}>
          {this.state.errorStatus && (
            <Alert variant="danger">{this.state.errorMessage}
            </Alert >
          )}
          <Form.Group controlId="formBasicEmail">
            <Form.Label >Username</Form.Label>
            <Form.Control type="text" placeholder="Username" onChange={(e)=>this.handleUsernameChange(e)} />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={(e)=>this.handlePasswordChange(e)} />
          </Form.Group>
          <Button variant="primary" onClick={(e)=>this.handleLogin(e)}>
            Login
          </Button>
          <>    </>
          <Button variant="primary" onClick={(e)=>this.handleNewUser(e)}>
            New User
          </Button>
        </Form>
      </div>
    )
  }
}

export default withCookies(Login);

