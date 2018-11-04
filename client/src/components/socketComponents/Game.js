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
            message: '',
            players: 0,
            partyleader: 'No one is Party leader. Please find game first!',
            errormsg: ''
        };

        this.socket = io('localhost:3000'); 
    }
    componentDidMount(){
        this.props.fetchCurrentUser()
        .then(() =>{
            if(!this.props.auth){
                this.setState({message: "Please login to play"}); 
            }else{
                this.setState({message: "Click find game, to play"})
            }
        });

        console.log('componentdidmount');
    }

    renderPage(){

        this.socket.on(this.state.MatchToken, (res) =>  this.setState({players: res})); 
        if(!this.props.auth){
            return(
                <div className="container">
                    <div className="textbox">
                        <h4 className="center">{this.state.message}</h4>
                    </div>    
                </div>
            )
        }else{

            let startgameBtn;
            if(this.props.auth.username === this.state.partyleader){
               startgameBtn = <button className="btn btn-primary btn-lg center" onClick={this.start.bind(this)}>Start Game</button>
               //this.setState({message: "Click start game when you want to start!"})
            }
           

            return (
                <div className="container">
                      <div className="textbox">
                          <h4 className="center">{this.state.message}</h4>
                          <h6 className="center"><b>Partyleader: {this.state.partyleader}</b></h6>
                      </div>
          
                      <div className="row 2 center">
                          {startgameBtn}
                          <button className="btn btn-primary btn-lg center" onClick={this.find.bind(this)}>Find Game</button>
                          <h6 className="right">{"Amount of Players in this game: "+ this.state.players}</h6>
                      </div>
                      
                      <div className="red-text">{this.state.errormsg}</div>
                </div>
              )
        }
    }

    find(){
        axios.get('/api/findGame')
        .then(res => {
          this.setState({MatchToken: res.data.MatchIdentication});
          this.setState({partyleader: res.data.PartyLeader});

          console.log(this.state.MatchToken);
    
          this.socket.emit('findGame',{
            MatchToken: this.state.MatchToken, 
            user: this.props.auth.username
          });      
        })
        .catch(console.error());
    }

    start(){
        let value =  {MatchIdentication: this.state.MatchToken};
        
        if(this.state.players > 1){
            axios.post('/api/startGame',
            value
            )
            .then(res =>{
            
            if(res.data !== undefined){
                console.log(res.data.errormsg);
            }
            });
        }else{
            this.setState({errormsg: 'You cant start until there is 2 players or more'})
        }
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
