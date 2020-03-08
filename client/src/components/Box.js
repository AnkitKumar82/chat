import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

import { animateScroll } from "react-scroll";

export class Box extends Component {
  constructor(props){
    super(props);
    this.socket = this.props.socket;
    this.state = {
      user_id: this.props.user_id,
      other:this.props.other,
      message:'',
      old_msg:[]  //contains user_one and user_two
    }
  }
  componentDidUpdate() {
      this.scrollToBottom();
  }
  scrollToBottom() {
      animateScroll.scrollToBottom({
        containerId: `box_${this.state.other}`
      });
  }
  createToastMessage(data){
    console.log('toast to create');
  }
  componentDidMount(){
    this.scrollToBottom();
    this.socket.emit('all_data',{user_id:this.state.user_id,other:this.state.other});
    this.socket.on('all_data_res',(val)=>{
      if(parseInt(this.state.other.user_id)===parseInt(val.user_id)){
        this.setState({
          old_msg : [...this.state.old_msg,...val.old_msg]
        })
      }
    })
    this.socket.on('rec_data',(val)=>{
      if(parseInt(this.state.other.user_id)===parseInt(val.user_id)){
        this.setState({
          old_msg : [...this.state.old_msg, val]
        })
      }else{
        this.createToastMessage(val);
      }
    });
  }
  handleSend(e){
    e.preventDefault();
    if(this.state.message.length!==0){
      this.setState({
        message:''
      })
      this.setState({
        old_msg : [...this.state.old_msg,{user_id:this.state.user_id,msg:this.state.message}]
      })
      this.socket.emit('sent_data',{user_id:this.state.user_id,msg:this.state.message,other:this.state.other});
    }
  }
  handleChange(e){
    this.setState({message: e.target.value});
  }
  render() {
    return (
      <div>
        <ListGroup size="sm" id={`box_${this.state.other}`} style={{maxHeight:'300px',overflow:'auto'}}>
        {this.state.old_msg.length > 0 ?
            (
              this.state.old_msg.map((value)=>{
                if(parseInt(value.user_id)===parseInt(this.state.user_id)){
                  return (
                    <ListGroup.Item style={{padding:'5px',paddingLeft:'15px'}} variant='info'>
                      {value.msg}
                    </ListGroup.Item>
                  );
                }else{
                  return(
                    <ListGroup.Item style={{padding:'5px',paddingLeft:'15px'}} variant='danger'>
                      {value.msg}
                    </ListGroup.Item>
                  );
                }
              })
            ):
            (
              <ListGroup.Item style={{padding:'5px',paddingLeft:'15px'}}>Say 'Hi'!!!</ListGroup.Item>  
            )
          }
        </ListGroup>
        <Form inline style={{marginTop:'5px'}}>
          <FormControl id={`send_${this.state.other}`} value={`${this.state.message}`} style={{width:"80%"}} type="text" placeholder="type here...." size="sm" onChange={(e)=>this.handleChange(e)}/>
          <Button
              type='submit'
              onClick={(e) => this.handleSend(e)}
              variant='outline-success'
              size="sm"
              style={{width:"20%",float:"right"}}
              aria-controls="search"
              aria-expanded={this.state.openModal}
          >
          Send
          </Button>
        </Form>
      </div>
    )
  }
}

export default Box
