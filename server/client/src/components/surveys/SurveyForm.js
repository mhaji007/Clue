import React, {Component} from 'react';
// Field compoent is a helper
// provided by redux-from to render
// any type of traditional html element
import {reduxForm, Field} from 'redux-form';

// SurveyForm shows a form for a user to add input
class SurveyForm extends Component {
    state = {  }
    render() { 
        return (
        <div>
            <form
            onSubmit= {this.props.handleSubmit(values=>console.log(values))}>
            <Field
            // type of input
            type="text"
            // Tells redux from 
            // we have one piece of
            // data produce by our form
            // called surveyTitle
            // Once we start typing
            // into the input
            // redux from takes that value
            // out of that input and stores it in
            // redux store under a key
            // of surveyTitle
            name="surveyTitle"
            // Tells the field to
            // appear as the input form
            component="input"
            />
            <button type="submit">Submit</button>
            </form>
        </div> 
         );
    }
}

export default reduxForm({
    form: 'surveyForm'
})(SurveyForm);
