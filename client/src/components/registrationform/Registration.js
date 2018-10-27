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
    this.props.createUser(userInfo, this.props.history);
  }

  render() {
    const {handleSubmit} = this.props;

    return (
      <div>
      <div className="row">
      
      <div className="col s6 offset-s3 z-depth-1" id="panell">
         <h5>Registration</h5>

         <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            {this.renderFields()}
           
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

export default reduxForm({
  validate,
  form: 'registrationForm'
})(
  connect(null, {createUser})(withRouter(Registration))
); 
