import React, {Component} from 'react';
import {reduxForm} from 'redux-form';

// SurveyForm shows a form for a user to add input
class SurveyForm extends Component {
    state = {  }
    render() { 
        return (
        <div>
            SurveyForm!
        </div> 
         );
    }
}

export default reduxForm({
    form: 'surveyForm'
})(SurveyForm);
