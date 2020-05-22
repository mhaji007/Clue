import _ from 'lodash';
import React, {Component} from 'react';
// Field compoent is a helper
// provided by redux-from to render
// any type of traditional html element
import {reduxForm, Field} from 'redux-form';
import SurveyField from './SurveyField';


const FIELDS = [
    {label:'Survey Title', name:'title'},
    {label:'Subject Line', name:'subject'},
    {label:'Email Body', name:'body'},
    {label:'Recipient List', name:'emails'},
];

// SurveyForm shows a form for a user to add input
class SurveyForm extends Component {
    
    renderFields() {
        return _.map(FIELDS, ({label, name}) => {
            return (<Field key={name} component={SurveyField} type="text" label={label} name={name}/>
        
        );
        });
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
