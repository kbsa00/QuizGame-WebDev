import React, { Component } from 'react'; 
import io from 'socket.io-client';
import axios from 'axios';

class Timer extends Component {
    constructor(props){
        super(props);
        this.state = {
            CountDown: 1,
            QuestionNumber: 0, 
            gameIsOver: false
        };

        if(process.env.NODE_ENV === 'production'){
            this.socket = io('/');
        }else if(process.env.NODE_ENV === 'development'){
            this.socket = io('localhost:3000'); 
        }
    }

    Timer() {
        this.setState({
          CountDown: this.state.CountDown - 1
        }); 
        this.props.data(this.state.CountDown);
       

        if(this.state.CountDown < 1) { 
          clearInterval(this.interval);
        }
        
        if(this.state.QuestionNumber < 10){
            if(this.state.CountDown === 0){
                this.setState({
                    CountDown: 10
                });
                
                this.setState({QuestionNumber: this.state.QuestionNumber + 1});
                clearInterval(this.interval);
                this.socket.emit('quiz', "new_question"); 
                this.interval = setInterval(this.Timer.bind(this), 1000);
            }
        }else if(this.state.QuestionNumber === 10 && this.state.gameIsOver === false){
            this.props.number(this.state.QuestionNumber);
            this.setState({gameIsOver: true});
            this.props.score();
        }

        if(this.state.QuestionNumber === 1){
            let value = {
                MatchIdentication: this.props.matchtoken
            };
            axios.post('/api/endgame', value);
        }
    }
    
      componentDidMount() {
        this.interval = setInterval(this.Timer.bind(this), 1000);
    }
      componentWillUnmount(){
        clearInterval(this.interval);
    }
      
    render() {
       
        return(
            <div className="container">
                <h5 className="center">{`Question: ${this.state.QuestionNumber}/10`}</h5>
                <h5 className="center">{`Timer: ${this.state.CountDown}`}</h5>
            </div>
        );
    }
}

export default Timer; 