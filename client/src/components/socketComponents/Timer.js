import React, { Component } from 'react'; 
import io from 'socket.io-client';

class Timer extends Component {
    constructor(props){
        super(props);
        this.state = {Counter: 3}; 

        if(process.env.NODE_ENV === 'production'){
            this.socket = io('/');
        }else if(process.env.NODE_ENV === 'development'){
            this.socket = io('localhost:3000'); 
        }
    }

    Timer() {
        this.setState({
          Counter: this.state.Counter - 1
        }); 

        if(this.state.Counter < 1) { 
          clearInterval(this.interval);
        }

        if(this.state.Counter === 0){
            this.setState({
                Counter: 10
            });
            clearInterval(this.interval);
            this.socket.emit('quiz', "new_question"); 
            this.interval = setInterval(this.Timer.bind(this), 1000);
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
                <h5 className="center">{`Timer: ${this.state.Counter}`}</h5>
            </div>
        );
      }
}



export default Timer; 