import React, { Component } from 'react'
import axios from 'axios';
import io from 'socket.io-client';
import {connect} from 'react-redux';
import {fetchCurrentUser} from '../../actions/index';


class Game extends Component {

    constructor(props){
        super(props);
        this.state = {
            MatchToken: '',
            message: ''
        };

        this.socket = io('localhost:3000'); 
    }
    componentDidMount(){
        this.props.fetchCurrentUser()
        .then(() =>{
            if(!this.props.auth){
                this.setState({message: "Please login to play"}); 
            }else{
                this.setState({message: "Click Start game to begin!"})
            }
        })
    }

    renderPage(){
        if(!this.props.auth){
            return(
                <div className="container">
                    <div className="textbox">
                        <h4 className="center">{this.state.message}</h4>
                    </div>    
                </div>
            )
        }else{
            return (
                <div className="container">
                      <div className="textbox">
                          <h4 className="center">{this.state.message}</h4>
                      </div>
          
                      <div className="row 2 center">
                          <button className="btn btn-primary btn-lg center" onClick={this.start.bind(this)}>Start Game</button>
                          <button className="btn btn-primary btn-lg center" onClick={this.find.bind(this)}>Find Game</button>
                          
                      </div>
                      
                </div>
              )
        }
    }

    find(){
        axios.get('/api/findGame')
        .then(res => {
          this.setState({MatchToken: res.data.MatchIdentication});
          console.log(this.state.MatchToken);
    
          this.socket.emit('findGame',{
            MatchToken: this.state.MatchToken, 
            user: this.props.auth.username
          });
      
          this.socket.on(this.state.MatchToken, (res) => console.log(res)); 
          
        })
        .catch(console.error());
    }

    start(){
        let value =  {MatchIdentication: this.state.MatchToken};
        axios.post('/api/startGame',
        value
        )
        .then(res =>{
            
          if(res.data !== undefined){
            console.log(res.data.errormsg);
          }
    
        })
    }

  render() {
    return(
        <div>
            {this.renderPage()}
        </div>
        
    )
  }
}

function mapStateToProps(state){
    return{auth: state.auth};
}

export default connect(mapStateToProps, {fetchCurrentUser})(Game);
