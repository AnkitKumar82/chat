import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withCookies} from "react-cookie";

import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ErrorPage from './components/Error';
import Login from './components/Login';
import Header from './components/Header';
import About from './components/About';
import New from './components/New';
import Connections from './components/Connections';
import io from "socket.io-client";
// const myServerAddr = 'http://localhost:5000'; //only place to change backend address
class App extends Component {
  constructor(props){
      super(props);
      this.state = {
          user_id : this.props.cookies.get('user_id') || "", //user id is actually a JWTtoken with user_id
          socket:io('/'),
          username: this.props.cookies.get('username') || '',
          tokenVerified : false    
      };
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
            .replace(/^ +/, "")
            .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
        //clearing cookies on page load
      this.handleTokenVerificationSuccess = this.handleTokenVerificationSuccess.bind(this);
      this.handleTokenVerificationFailure = this.handleTokenVerificationFailure.bind(this);
  }
  componentDidMount(){
        this.state.socket.emit('updatesocket',{user_id:this.state.user_id});
        this.state.socket.on('error_user_id',(value)=>{
            document.cookie.split(";").forEach((c) => {
                document.cookie = c
                    .replace(/^ +/, "")
                    .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
                });
                this.handleTokenVerificationFailure();
        });
  }
  handleTokenVerificationSuccess(){
    this.setState({
        tokenVerified : true    
    });
  }
  handleTokenVerificationFailure(){
    this.setState({
        tokenVerified : false    
    });
  }
  render(){
      return (
          <div style={{fontFamily:"Arial"}}>
              <Header handleTokenVerificationFailure={this.handleTokenVerificationFailure} socket={this.state.socket}/>  
              <Router >
                  <Switch>
                      <Route exact path="/" component={()=>{
                          if(this.state.tokenVerified===false){
                              return (
                                <Login socket={this.state.socket} handleTokenVerificationSuccess={this.handleTokenVerificationSuccess}/>
                                )
                          }else{
                          return(
                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                    <Connections username={this.state.username} user_id={this.state.user_id} socket={this.state.socket}/>
                                    <New username={this.state.username} user_id={this.state.user_id} socket={this.state.socket} style={{width:'300px'}}/>
                                </div>
                            )
                          }
                      }} />
                      <Route exact path="/Error" component={ErrorPage}/>
                      <Route exact path="/About" component={About}/>
                  </Switch> 
              </Router>  
          </div>
      )
  }
}
var AppWithCookies = withCookies(App);
ReactDOM.render(<AppWithCookies/>, document.getElementById('root'));

serviceWorker.unregister();
