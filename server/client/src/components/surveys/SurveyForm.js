// SurveyForm shows a form for a user to add input

import _ from 'lodash';
import React, {Component} from 'react';
// Field compoent is a helper
// provided by redux-from to render
// any type of traditional html element
import {reduxForm, Field} from 'redux-form';
import {Link} from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';


class SurveyForm extends Component {
    
    renderFields() {
        return _.map(formFields, ({label, name}) => {
            return (<Field key={name} component={SurveyField} type="text" label={label} name={name}/>
        
        );
        });
    }

    render() { 
        return (
        <div >
            <form style={{marginTop:"20px"}}
            onSubmit= {this.props.handleSubmit(this.props.onSurveySubmit)}>
                {this.renderFields()}
            <Link to="/surveys" className="red btn-flat white-text" style={{borderRadius: 3}}>
            <i className="material-icons right" style={{paddingLeft:"0px", paddingTop:"1px"}}> cancel </i>
                Cancel
            </Link>
            <button style={{borderRadius: 3}} type="submit" className="black btn-flat right white-text">Next<i style={{ paddingTop:"1px"}} className="material-icons right">navigate_next</i></button>
            </form>
        </div> 
         );
    }
}

// values is the object containing all the values from
// the form
const validate = values => {
    const errors = {};
    errors.emails = validateEmails(values.emails||'');
    formFields.forEach(({ name, label, required }) => {
        if (required && !values[name]) {
            errors[name] = `You must provide ${label}`;
        }
    });


    return errors;
};

export default reduxForm({
    validate,
    form: 'surveyForm', // tells redux form how to namespace all the values for this prticular form inside the form reducer
    destroyOnUnmount:false
})(SurveyForm);
