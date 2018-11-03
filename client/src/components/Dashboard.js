import React, { Component } from 'react'; 
import Chat from './socketComponents/Chat';
import GameMode from './socketComponents/GameMode';
import axios from 'axios'; 
import io from 'socket.io-client'; 


class Dashboard extends Component {

  constructor(props){
    super(props);
    this.state = {
      MatchToken: ''
    }
    
    this.socket = io('localhost:3000'); 
  }

  startMatch(){
    axios.get('/api/findGame')
    .then(res => {
      this.setState({MatchToken: res.data.MatchIdentication});
      console.log(this.state.MatchToken);

      this.socket.emit('findGame',{
        MatchToken: this.state.MatchToken, 
        user: this.props.username
      });
  
      this.socket.on(this.state.MatchToken, (res) => console.log(res)); 
      
    })
    .catch(console.error());
  }
  
  render() {
    return (
      <div>
            <div className="jumbotron">
                <div className="container">
                    <h1 className="display-3">Welcome back,{' '+this.props.username}</h1>
                    <b> 
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                    ea commodo consequat. Duis aute irure dolor in reprehenderitin voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                    sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </b>
                </div>
                
            </div> 
            <button className="btn btn-primary form-control" onClick={this.startMatch.bind(this)}>Send</button>
      </div>
    );
  }
}

export default Dashboard;
