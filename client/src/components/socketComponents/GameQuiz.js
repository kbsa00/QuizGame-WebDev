import React, { Component } from 'react'; 
import io from 'socket.io-client';
import axios from 'axios'; 
import shuffle from 'shuffle-array';

class GameQuiz extends Component {

  constructor(props){
    super(props);
    
    this.state = { 
        matchtoken: '',
        question: '',
        category: '',
        answers: [],
        correct_answer: '', 
        error: false
    };
    
    if(process.env.NODE_ENV === 'development'){
        this.socket = io('localhost:3000'); 
    }else if(process.env.NODE_ENV === 'production'){
        this.socket = io('/');
    }

    const {
        match
    } = this.props.match.params

    let matchid = match.substring(1);
    
    this.socket.emit('quiz', {matchtoken: matchid});
   
    this.socket.on('game', (res) => {
        addingStates(res);
    });

    const addingStates = res => {
        this.setState({question: res.question});
        this.setState({category: res.category});
        this.setState({answers:[...res.incorrect_answers, res.correct_answer]});
        this.setState({correct_answer: res.correct_answer});
        shuffle(this.state.answers);
    }

    this.buttonClick = this.buttonClick.bind(this); 

  }

  componentDidMount(){

    const {
        match
    } = this.props.match.params

    let value = {
        MatchIdentication: match
    };

    axios.post('/api/checkGameExist', value)
        .then((res) => {
            this.setState({
                matchtoken: res.data.matchtoken
            });

            this.socket.on(this.state.matchtoken, (res) =>{
                console.log(res);
            });
        }).catch(err => this.setState({
            error: true
        }));
        
  }

  buttonClick(e){
    console.log(e.target.id);

  }

  render() {
    if(!this.state.error){
        return(
          <div className="container">
              <h5 className="center">Category: {this.state.category}</h5>
                  <div className="something jumbotron">
                      <h3 className="questiontext center">{this.state.question}</h3>
                  </div>
          
              <div><h5 className="center">TIMER</h5></div>
  
              <div>
                  <div className="row">
                      <button className="btn-large col" onClick={this.buttonClick} id={this.state.answers[0]}>{this.state.answers[0]}</button>
                      <button className="btn-large col" onClick={this.buttonClick} id={this.state.answers[1]}>{this.state.answers[1]}</button>
                      <div className="w-100"></div>
                      <button className="btn-large col" onClick={this.buttonClick} id={this.state.answers[2]}>{this.state.answers[2]}</button>
                      <button className="btn-large col"  onClick={this.buttonClick} id={this.state.answers[3]}>{this.state.answers[3]}</button>
                  </div>
              </div>   
          </div>
         
        );
    } else if(this.state.error){
        return(
            <div className="container">
                <div className="textbox">
                    <h4 className="messagegame center">OOPS!</h4>
                    <p className="center"><b>I dont think you are supposed to be here.. Did you want to start a game?</b></p>
                </div>
            </div>
        );
    }
  }
}


export default GameQuiz; 