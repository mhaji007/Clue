import _ from 'lodash';
import React, {Component} from 'react';
// Field compoent is a helper
// provided by redux-from to render
// any type of traditional html element
import {reduxForm, Field} from 'redux-form';
import {Link} from 'react-router-dom';
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
        <div >
            <form style={{marginTop:"20px"}}
            onSubmit= {this.props.handleSubmit(values=> console.log(values))}>
                {this.renderFields()}
            <Link to="/surveys" className="red btn-flat white-text">
            <i className="material-icons right" style={{marginLeft:"4px", paddingTop:"1px"}}> cancel </i>
                Cancel
            </Link>
            <button type="submit" className="blue-grey btn-flat right white-text"><i style={{marginLeft:"4px", paddingTop:"1px"}} className="material-icons right">navigate_next</i>Next</button>
            </form>
        </div> 
         );
    }
}

// values is the object containing all the values from
// the form
function validate(values) {
    const errors ={};

    if (!values.title) {
        errors.title = 'You must provide a title';
    }


    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm'
})(SurveyForm);
