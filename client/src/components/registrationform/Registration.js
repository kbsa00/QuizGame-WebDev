import React, { Component } from 'react';
import {reduxForm, Field} from 'redux-form'; 
import formFields from './formFields';
import registrationField from './registrationField';
import _ from 'lodash';


class Registration extends Component {

  renderFields(){
    return _.map(formFields, ({label, name}) => {
        return <Field key={name}
        component={registrationField}
        type= "text"
        label={label} 
        name={name}  
        /> 
    });
}

  onSubmit(values){
      console.log('works')
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

  _.each(formFields, ({name}) => {
    if(!values[name]) errors[name] = 'Fill out the field'; 
  });

  return errors;
}


export default reduxForm({
  validate,
  form: 'registrationForm'
})(Registration); 
