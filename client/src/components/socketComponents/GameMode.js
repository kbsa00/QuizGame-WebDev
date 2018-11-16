import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'; 

class GameMode extends Component {

  constructor(props){
      super(props); 
  }
 
  start(){
    this.props.history.push('/gamestart'); 
  }

  render() {
    return (
      <div className='container'>
        <div className="row">
            <div className="col s12 m7">
                <div className="card gamemode">
                    <div className="header">
                        <h1 className="card-title center">REGULAR GAME</h1>
                    </div>

                    <div className="card-content">
                        <p>
                           Are you ready to play a round of Multiplayer Quiz? All you need to do is click the Start button
                           and you are able to play against other players on Quizznet! 
                           What are you waiting for?
                        </p>
                    </div>

                    <div className="card-action">
                        <button className="btn btn-primary form-control" onClick={this.start.bind(this)}>Start Game</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

export default withRouter(GameMode);
