import React, { Component } from 'react'; 
import io from 'socket.io-client';
import axios from 'axios'; 
import shuffle from 'shuffle-array';
import Timer from './Timer';
import {connect} from 'react-redux';
import _ from 'lodash';

class GameQuiz extends Component {

  constructor(props){
    super(props);
    
    this.state = { 
        matchtoken: '',
        question: '',
        category: '',
        answers: [],
        correct_answer: '',
        your_answer: '',
        timer: 0,
        points: 0,
        questionnumber: 0,
        roundrank:  [],
        error: false
    };
    
    if(process.env.NODE_ENV === 'development'){
        this.socket = io('localhost:3000'); 
    }else if(process.env.NODE_ENV === 'production'){
        this.socket = io('/');
    }
    
    this.socket.on('game', (res) => {
        addingStates(res);
    });

    const addingStates = res => {
        this.setState({question: res.question});
        this.setState({category: res.category});
        this.setState({answers:[...res.incorrect_answers, res.correct_answer]});
        this.setState({correct_answer: res.correct_answer});
        shuffle(this.state.answers);
        this.setState({your_answer: ''});
    }

    this.socket.on('scoreranks', (data) => {
        if(data.matchtoken === this.state.matchtoken){
            let value ={
                username: data.username,
                points: data.points
            }
            addingScoreRanks(value)
        }
    });

    const addingScoreRanks = value => {
        this.setState({roundrank:[...this.state.roundrank, value]});
    }


    this.buttonClick = this.buttonClick.bind(this);
  }

  updateTimer(value){
     this.setState({timer: value});
  }

  updateQuestionNumber(value){
    this.setState({questionnumber: value});
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
        }).catch(err => this.setState({
            error: true
        })
    );        
  }


  buttonClick(e){
    this.setState({your_answer: e.target.id});
    if(this.state.correct_answer === e.target.id){

        if(this.state.points === 0){
            this.setState({points: this.state.timer});
        }else{
            this.setState({points: this.state.points * this.state.timer});
        }
    }
  }

  scoreRanks(){
    this.socket.emit('rank', {matchtoken: this.state.matchtoken, username: this.props.auth.username, points: this.state.points});
  }

  renderScores(){
      return _.map(this.state.roundrank, scores => {
          return(
              <li key={scores.username} className="list-group-item">{`Name: ${scores.username} Points: ${scores.points}`}</li>
          );
      });
  }


  render() {

    if(this.state.questionnumber === 10 && this.state.timer === 0){
        
          return(
            <div className="container">
                <div className="textbox">
                    <h4 className="center">END OF THE QUIZ</h4>
                    <h6 className="center">Scoreboard</h6>
                    <ul className="list-group">
                        {this.renderScores()}
                    </ul>
                </div> 
            </div>
          );
        
    }
    else if(!this.state.error){
        return(
          <div className="container">
              <h6 className="center">{`Your points ${this.state.points}`}</h6>
              <h5 className="center">Category: {this.state.category}</h5>
              <h6 className="center">{"Your answer: " + this.state.your_answer}</h6>
              <h6 className="center">Corect answer is: {' '} {this.state.your_answer ? this.state.correct_answer : ''}</h6>
                  <div className="something jumbotron">
                      <h3 className="questiontext center">{this.state.question}</h3>
                  </div>
          
              <div><Timer data={this.updateTimer.bind(this)} number={this.updateQuestionNumber.bind(this)} score={this.scoreRanks.bind(this)} matchtoken={this.state.matchtoken}/></div>
  
              <div>
                  <div className="row">
                      <button className="btn-large col" disabled={this.state.your_answer} onClick={this.buttonClick} id={this.state.answers[0]}>{this.state.answers[0]}</button>
                      <button className="btn-large col" disabled={this.state.your_answer} onClick={this.buttonClick} id={this.state.answers[1]}>{this.state.answers[1]}</button>
                      <div className="w-100"></div>
                      <button className="btn-large col" disabled={this.state.your_answer} onClick={this.buttonClick} id={this.state.answers[2]}>{this.state.answers[2]}</button>
                      <button className="btn-large col" disabled={this.state.your_answer} onClick={this.buttonClick} id={this.state.answers[3]}>{this.state.answers[3]}</button>
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

function mapStateToProps(state){
    return{auth: state.auth};
}

export default connect(mapStateToProps)(GameQuiz); 