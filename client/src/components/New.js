import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
export class New extends Component {
  constructor(props){
    super(props);
    this.socket = props.socket;
    this.state = {
      username: props.username,
      user_id: props.user_id,
      sentList :[],
      receiveList:[]
    }
  }
  componentDidMount(){
    this.socket.emit('new',{user_id:this.state.user_id});
    this.socket.on('cancel_req_res',(value)=>{
      this.setState({
        sentList: [...this.state.sentList.filter((val)=>{
          return parseInt(val.user_id) !== parseInt(value.user_id);
        })],
        receiveList: [...this.state.receiveList.filter((val)=>{
          return parseInt(val.user_id) !== parseInt(value.user_id);
        })],
      })
    });
    this.socket.on('new_res',(result)=>{
      if(result.users!==undefined){
        let recList = result.newcon.map(val=>val.user_two);
        let senList = result.newcon.map(val=>val.user_one);
        this.setState({
          sentList : [...result.users.filter((val)=>{
            return !senList.includes(val.user_id) && val.user_id!==parseInt(this.state.user_id);
          })],
          receiveList : [...result.users.filter((val)=>{
            return !recList.includes(val.user_id) && val.user_id!==parseInt(this.state.user_id);
          })]
        });
      }
    });
    this.socket.on('accept_sent_req_res',(res)=>{
      this.setState({
        sentList : [...this.state.sentList.filter((val)=>{
          return val.user_id !== res.user_id;
        })]
      });
    });
    this.socket.on('new_req_res',(res)=>{
      this.setState({
        receiveList : [...this.state.receiveList,res]
      });
    });
    this.socket.on("new_req_add_sent_res",(res)=>{
      this.setState({
        sentList : [...this.state.sentList,...res]
      });
    });
    this.socket.on("new_req_add_rec_res",(res)=>{
      this.setState({
        receiveList : [...this.state.receiveList,...res]
      });
    });
  }
  handleAccept(value){
    this.socket.emit('accept',{user_id:this.state.user_id,data:value});
    this.setState({
      receiveList : [...this.state.receiveList.filter((val)=>{
        return val!==value;
      })]
    });
  }
  handleCancel(value){
    this.setState({
      sentList : [...this.state.sentList.filter((val)=>{
        return val.user_id !== value.user_id;
      })],
      receiveList : [...this.state.receiveList.filter((val)=>{
        return val.user_id !== value.user_id;
      })]
    });
    this.socket.emit('cancel_request',{user_id:this.state.user_id,data:value});
  }
  render() {
    return (
      <span style={{width:"28%"}}>
        <h4>Received</h4>
        <ListGroup>
          {this.state.receiveList.length > 0 ?
            (
              this.state.receiveList.map((value)=>{
                return (<ListGroup.Item>{value.username}
                  <ButtonGroup aria-label="Basic example" size="sm" style={{float:"right",marginLeft:"10px"}}>
                    <Button variant="success" onClick={(e)=>this.handleAccept(value)} >Accept</Button>
                    <Button variant="danger" onClick={(e)=>this.handleCancel(value)}>Reject</Button>
                  </ButtonGroup>
                </ListGroup.Item>)
                })
            ):
            (
              <ListGroup.Item>No new requests</ListGroup.Item>  
            )
          }
        </ListGroup>
        <h4>Sent</h4>
        <ListGroup>
          {this.state.sentList.length > 0 ?
            (
              this.state.sentList.map((value)=>{
                return(<ListGroup.Item>
                    {value.username}
                  <ButtonGroup aria-label="sentButton" size="sm" style={{float:"right",marginLeft:"10px"}}>
                    <Button variant="danger" onClick={(e)=>this.handleCancel(value)}>Cancel</Button>
                  </ButtonGroup>
                </ListGroup.Item>)
              })
            ):
            (
              <ListGroup.Item>No sent requests</ListGroup.Item>  
            )
          }
        </ListGroup>
      </span>
    )
  }
}

export default New
