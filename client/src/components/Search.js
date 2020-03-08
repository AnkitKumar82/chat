import React, { Component } from 'react'
import { withCookies } from 'react-cookie'
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
class Search extends Component {
  constructor(props){
    super(props);
    this.socket = props.socket;
    this.state = {
      searchData : props.searchData || [],
      user_id : props.cookies.get('user_id')
    }
  }
  componentWillReceiveProps(props){
    this.setState({
      searchData: props.searchData
    })
  }
  handleSendRequest(value){
    this.setState({
      searchData : this.state.searchData.filter((val)=>{
        return parseInt(val.user_id) !== parseInt(value.user_id);
      })
    })
    this.socket.emit('new_req_add',{user_id:this.state.user_id,data:value});
  }
  render() {
    return (
        <ListGroup>
          {this.state.searchData.length === 0?
            <ListGroup.Item style={{padding:'5px',paddingLeft:'15px'}}>No results found</ListGroup.Item>
          : this.state.searchData.map((value,index)=>{
            return(
            <ListGroup.Item style={{padding:'5px',paddingLeft:'15px'}}>{value.username}
              <Button style={{float:'right'}} onClick={(e)=>this.handleSendRequest(value)} variant="success" size="sm">Send Request</Button>
            </ListGroup.Item>
            )
          })}
        </ListGroup>
    )
  }
}

export default withCookies(Search)