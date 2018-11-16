import React, { Component } from 'react'; 
import io from 'socket.io-client'; 


export default class GameQuiz extends Component {

  constructor(props){
    super(props);
    this.state = {
        auth: '', 
        question: '', 
        answers: []
    };

    if(process.env.NODE_ENV === 'production'){
        this.socket = io('/'); 
    }else{
        this.socket = io('localhost:3000'); 
    }
  }

  checkingAuthentication(){
    try {
        this.props.location.state.matchtoken;
       
    } catch (error) {
       /*
        return(
            <div className="textbox">
                <h4 className="messagegame center">You can't start a like this mister</h4>
            </div>
        )
        */
    }    
    
  }
  

  render() {
    return (
      <div className="container">
        {this.checkingAuthentication()}
        <div className="something jumbotron">
            <h3 className="questiontext center">SOME RANDOM QUESTION</h3>
        </div>
        
        <div><h5 className="center">TIMER</h5></div>

        <div>
            <div className="row">
                <button className="btn-large col">ANSWER 1</button>
                <button className="btn-large col">ANSWER 2</button>
                <div class="w-100"></div>
                <button className="btn-large col">ANSWER 3</button>
                <button className="btn-large col">ANSWER 4</button>
            </div>
        </div>
        
      </div>
    )
  }
}


