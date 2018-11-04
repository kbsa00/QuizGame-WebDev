import React, { Component } from 'react'
import {UserloginAction} from '../actions/index'; 
import {connect} from 'react-redux'; 
import {Field, reduxForm} from 'redux-form';
import {withRouter} from 'react-router-dom'; 


class Login extends Component {

  state = {
    error: false
  }

  onButtonSubmit(values){
    this.props.UserloginAction(values, this.props.history)
    .then(() => {

        if(this.props.auth === false){
          this.setState({
            error: 'Failed login, Username or password is wrong.'
          });
        }

    });
}


  render() {
    const {handleSubmit} = this.props;

    return (
      <div>
        <div className="row">
      
         <div className="col s6 offset-s3 z-depth-1" id="panel">
            <h4 className="center">Login at Quiznet</h4>
            <p className="lead text-muted center">
              Have you already created a account with us? 
              
              Then you can simply log in with your Username and Password.
            </p>

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

              <div className="red-text">
                {this.state.error}
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
connect(mapStateToProps, {UserloginAction})(withRouter(Login))
);
