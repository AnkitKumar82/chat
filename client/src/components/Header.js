import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge'
import { withCookies } from 'react-cookie'
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse'
import Search from './Search';
class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            openModal : false,
            username: this.props.cookies.get('username'),
            user_id: this.props.cookies.get('user_id'),
            searchQuery : "",
            searchData : []
        }
        this.socket = props.socket;
    }
    handleChange(e){
        this.setState({
            searchQuery : e.target.value
        })
    }
    handleLogout(e){
        this.socket.emit('logout',{user_id:this.state.user_id});
        window.location.href = '/Login';
    }
    handleOpenModal(e){
        e.preventDefault();
        if(this.state.searchQuery.length > 0 || this.state.openModal){
            this.setState({
                openModal : !this.state.openModal
            });
            if(!this.state.openModal){
                this.socket.emit('search_query',{user_id:this.state.user_id,searchQuery:this.state.searchQuery});
                this.socket.on('search_query_res',(data)=>{
                    this.setState({
                        searchData : [...data]
                    });
                })
            }
        }
    }
    render() {
        return (
            <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">Message</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="/About">About</Nav.Link>
                    </Nav>
                    <Form inline>
                    <FormControl type="text" placeholder="Search" size="sm" className="mr-sm-2" onChange={(e)=>this.handleChange(e)}/>
                        <Button
                            type='submit'
                            onClick={(e) => this.handleOpenModal(e)}
                            variant={this.state.openModal?'outline-danger':'outline-success'}
                            aria-controls="search"
                            size="sm"
                            aria-expanded={this.state.openModal}
                        >
                        Search
                        </Button>
                    </Form>
                    <Button style={{marginLeft:"20px"}} variant="danger" onClick={(e)=>{this.handleLogout(e)}}>{this.props.cookies.get('username')}</Button>
                </Navbar.Collapse>
            </Navbar>
            <Collapse in={this.state.openModal}>
                <div id="search-aria">
                    <Search socket={this.props.socket} searchData = {this.state.searchData}/>
                </div>
            </Collapse>
        </div>
        )
    }
}

export default withCookies(Header);