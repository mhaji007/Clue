import React, {Component} from 'react';
// Field compoent is a helper
// provided by redux-from to render
// any type of traditional html element
import {reduxForm, Field} from 'redux-form';
import SurveyField from './SurveyField';

// SurveyForm shows a form for a user to add input
class SurveyForm extends Component {
    
    renderFields() {
        return (
            <div>
                <Field type="text" name="title" component={SurveyField}/>
            </div>
        );
    }

    render() { 
        return (
        <div>
            <form
            onSubmit= {this.props.handleSubmit(values=> console.log(values))}>
                {this.renderFields()}
            <button type="submit">Submit</button>
            </form>
        </div> 
         );
    }
}

export default reduxForm({
    form: 'surveyForm'
})(SurveyForm);
