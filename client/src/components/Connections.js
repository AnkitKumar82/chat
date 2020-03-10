import React, { Component } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup'
import Box from './Box';
export class Connections extends Component {
  constructor(props){
    super(props);
    this.socket = props.socket;
    this.state = {
      username: props.username,
      user_id: props.user_id,
      list :[]
    }
    if(parseInt(this.state.user_id) === 0){
      window.location.href = '/Login';
    }
  }
  componentDidMount(){
    this.socket.emit('start',{user_id:this.state.user_id});
    this.socket.on('start_res',res=>{
      if(res.length>0){
        this.setState({
          list :[...this.state.list,...res ]
        });
      }
    });
    this.socket.on('update_status',res=>{
      this.setState({
        list :[...this.state.list.map((val)=>{
          if(parseInt(val.user_id)===parseInt(res.user_id)){
            return({
              user_id:val.user_id,
              online:parseInt(res.online),
              username:val.username
            })
          }else{
            return val
          }
        })]
      })
    });
    this.socket.on('accept_rec_req_res',res=>{
      console.log(res,"accept_rec_req_res");
      this.setState({
        list :[...this.state.list,res]
      });
    });
    this.socket.on('accept_sent_req_res',(res)=>{
      this.setState({
        list :[...this.state.list,res]
      });
    });
    this.socket.on('delete_conn',(value)=>{
      console.log(value.user_id,'delete conn');
      this.setState({
        list:[...this.state.list.filter((val)=>{
          return parseInt(val.user_id) !== parseInt(value.user_id); 
        })]
      })
    });
  }
  handleDelete(value){
    this.setState({
      list:[...this.state.list.filter((val)=>{
        return parseInt(val.user_id) !== parseInt(value); 
      })]
    });
    this.socket.emit('delete_conn_start',{user_id:this.state.user_id,other_id:value});
  }
  render() {
    return (
      <Accordion defaultActiveKey="0" style={{width:"70%"}}>
        <h5 style={{padding:"5px"}}>Connections</h5>
        {this.state.list.length > 0 ?
          this.state.list.map((key,index)=>{
          return (
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey={index}>
                      {key.username}
                      <Button
                        onClick={(e) => this.handleDelete(key.user_id)}
                        variant='danger'
                        size="sm"
                        style={{width:"20%",marginLeft:'10px',float:"right"}}
                      >
                      Delete
                      </Button>
                      { (key.online === 1)?
                        (<Badge style={{marginLeft:"10px"}} variant="success">Online</Badge>)
                      :
                        (<Badge style={{marginLeft:"10px"}} variant="danger">Offline</Badge>)
                      }
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={index}>
                      <Card.Body>
                        <Box other={key} socket={this.socket} user_id={this.state.user_id} />
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
          );
        })
        :(
          <ListGroup.Item>No Connections</ListGroup.Item>  
        )
        
        }
      </Accordion>
    )
  }
}

export default Connections