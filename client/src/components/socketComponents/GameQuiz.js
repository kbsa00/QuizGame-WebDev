import React, { Component } from 'react'; 


export default class GameQuiz extends Component {

  constructor(props){
    super(props);
    this.state = {
        auth: '', 
        question: '', 
        answers: []
    };
  }

  checkingAuthentication(){
    try {
        this.props.location.state.matchtoken;
        this.setState({
            auth: this.props.location.state.matchtoken
        })
    } catch (error) {
        return(
            <div className="textbox">
                <h4 className="messagegame center">You can't start a like this mister</h4>
            </div>
        )
    }    
    
  }
  

  render() {
    return (
      <div className="container">
        {this.checkingAuthentication()}
        
        
      </div>
    )
  }
}


