import React, { Component } from 'react';
import {reduxForm, Field} from 'redux-form'; 
import formFields from './formFields';
import registrationField from './registrationField';
import validateEmail from '../../utils/validateEmail';
import {createUser} from '../../actions/index';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import _ from 'lodash';


class Registration extends Component {
  
  state = {
    regError: false
  }

  renderFields(){
    return _.map(formFields, ({label, name, type}) => {
      return <Field key={name}
        component={registrationField}
        type={type}
        label={label} 
        name={name}  
        />
    });
}

  onSubmit(values){
    const userInfo = {
      email: values.email,
      username: values.username,
      password: values.password
    }
    this.props.createUser(userInfo, this.props.history)
    .then(() => {
       if (this.props.auth === false) {

          this.setState({
            regError: 'Email or Username already exist, Try again'
          }) 
       }
    });
  }

  render() {
    const {handleSubmit} = this.props;

    return (
      <div>
      <div className="row">
      
      <div className="col s6 offset-s3 z-depth-1" id="panell">
         <h4 className="center">Registration</h4>
         <p className="lead text-muted center">
            You can simply create a user with us. All you need to do is to fill out 
            all of the credentials. Easy steps before be able to play games on our 
            platform.
         
         </p>

         <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            {this.renderFields()}
           
            <div className="red-text">
              {this.state.regError}
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

function validate(values){
  const errors = {};
  
  errors.email = validateEmail(values.email || '');

  if(values.password !== values.passwordcheck){
    errors.passwordcheck = 'Make sure password are the same';
  }

  _.each(formFields, ({name}) => {
    if(!values[name]) errors[name] = 'Fill out the input field'; 
  });

  return errors;
}

function mapStateToProps({auth}){
 return {auth: auth}
}

export default reduxForm({
  validate,
  form: 'registrationForm'
})(
  connect(mapStateToProps, {createUser})(withRouter(Registration))
); 
