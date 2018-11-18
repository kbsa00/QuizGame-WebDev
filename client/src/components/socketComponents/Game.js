import React, { Component } from 'react'
import axios from 'axios';
import io from 'socket.io-client';
import {connect} from 'react-redux';
import {fetchCurrentUser} from '../../actions/index';
import {withRouter} from 'react-router-dom'; 


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

        if(process.env.NODE_ENV === 'development'){
            this.socket = io('localhost:3000'); 
        }else if(process.env.NODE_ENV === 'production'){
            this.socket = io('/');
        }

        this.socket.on('starting_game', (data) =>{
            if(data.gametoken === this.state.MatchToken){
                this.props.history.push(`/gamequiz:${this.state.MatchToken}`);
            }
        })
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
    }

    componentWillUnmount(){
        this.socket.close();
       // this.socket.off('findGame')
        //this.socket.off('starting_game');
        //this.socket.off(this.state.MatchToken);
    }

    renderPage(){

        this.socket.on(this.state.MatchToken, (res) =>  this.setState({players: res})); 
        if(!this.props.auth){
            return(
                <div className="container">
                    <div className="textbox">
                        <h4 className="messagegame center">{this.state.message}</h4>
                    </div>    
                </div>
            )
        }else{

            let startgameBtn;
            if(this.props.auth.username === this.state.partyleader){
               startgameBtn = <button className="btn btn-primary btn-lg center" onClick={this.start.bind(this)}>Start Game</button>
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

          this.setState({message: "Wait for the party leader to start"});
            
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

                this.socket.emit("startGame", {
                    MatchToken: this.state.MatchToken
                });

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

export default withRouter(connect(mapStateToProps, {fetchCurrentUser})(Game));
