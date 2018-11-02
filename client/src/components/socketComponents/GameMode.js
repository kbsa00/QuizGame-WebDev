import React, { Component } from 'react'

class GameMode extends Component {
  render() {
    return (
      <div className='container'>
        <div className="row">
            <div className="col s12 m7">
                <div className="card gamemode">
                    <div className="card-image">
                        <img className="cardpic"src="https://static-cdn.jtvnw.net/jtv_user_pictures/e91a3dcf-c15a-441a-b369-996922364cdc-profile_image-300x300.png" />
                        <span className="card-title">REGULAR GAME</span>
                    </div>

                    <div className="card-content">
                        <p>
                            I am a very simple card. I am good at containing small bits of information.
                            I am convenient because I require little markup to use effectively.
                        </p>
                    </div>

                    <div className="card-action">
                        <a href="/">This is a link</a>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}


export default GameMode;
