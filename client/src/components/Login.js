import React, { Component } from 'react'

//Redux Form in here!!

export default class Login extends Component {
  render() {
    return (
      <div>
        <div className="row">
         <div className="col s6 offset-s3 z-depth-1" id="panell">
            <h5>Login</h5>
            <form>
            <div className="input-field" id="username">
               <label htmlFor="username">Username</label>
               <input type="text" className="validate">
                   
               </input>
            </div>
   
            <div className="input-field">
               <label htmlFor="password">Password</label>
               <input type="password" className="validate">
                 
               </input>
            </div>

            <a className="btn btn-primary btn-lg right" href="#" role="button">
                Login
              </a>
            <a className="btn btn-primary btn-lg right" href="#" role="button">
                Google +
            </a>
            </form>
         </div>
         </div>
      </div>
    );
  }
}
