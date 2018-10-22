import React, { Component } from 'react'
import {UserloginAction} from '../actions/index'; 
import {connect} from 'react-redux'; 
import {Field, reduxForm} from 'redux-form'; 


class Login extends Component {
  onButtonSubmit(values){
    
    this.props.UserloginAction(values)
    .then(() =>{
        if(this.props.auth) console.log('logged in')
        else console.log('unsuccsessfully logged')
    })
}


  render() {
    const {handleSubmit} = this.props;

    return (
      <div>
        <div className="row">
      
         <div className="col s6 offset-s3 z-depth-1" id="panell">
            <h5>Login</h5>

            <form onSubmit={handleSubmit(this.onButtonSubmit.bind(this))}>
              <div>

                  <Field
                    name="username"
                    component="input"
                    type="text"
                    placeholder="Username"
                   />
              </div>

              <div>
                <Field
                  name="password"
                  component="input"
                  type="Password"
                  placeholder="Password"
                />
              </div>
              
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




function mapStateToProps(state){
  return{auth: state.auth};
}

export default reduxForm({
  form: 'Loginform'
})(
connect(mapStateToProps, {UserloginAction})(Login)
);
