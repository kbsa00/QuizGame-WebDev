import React, { Component } from 'react'

export default class Registration extends Component {
  render() {
    return (
      <div>
      <div className="row">
      
      <div className="col s6 offset-s3 z-depth-1" id="panell">
         <h5>Login</h5>

         <form onSubmit={handleSubmit(this.onButtonSubmit.bind(this))}>
            
           
           <div>
             <button
               type="submit" 
               className="btn btn-primary btn-lg right">
               Login
             </button>
           </div>
         </form>
      </div>
      
      </div>
   </div>
    );
  }
}
