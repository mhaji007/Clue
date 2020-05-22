// SurveyFormReview shows use their form
// inputs for review
import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import formFields from './formFields';
import * as actions from '../../actions'

const SurveyFormReview = ({onCancel, formValues, submitSurvey}) => {
    
    const reviewFields = _.map(formFields, ({name, label}) =>{
        return (
            <div key = {name}>
            
                <label>
                    {label}
                </label>
                
                <div>
                
                    {formValues[name]}
                </div>
            
            </div>
        );
    });
    
    return ( 
        <div>
        <h5>Please cofirm your entries</h5>
        {reviewFields}
   
        <button onClick={onCancel} style={{borderRadius: 3}} className="black btn-flat left white-text">Back<i style={{ paddingTop:"1px"}} className="material-icons left">navigate_before</i></button>
        
        <button onClick={() => submitSurvey(formValues)} style={{borderRadius: 3}} className="btn-flat right purple darken-4 white-text">
        Send Survey
        <i className="material-icons right white-text" style={{ paddingTop:"1px"}}>email</i>
        </button>

        </div>

     );
};

function mapStateToProps(state) {
    return {
        formValues:state.form.surveyForm.values

    
};

}
 
export default connect(mapStateToProps, actions)(SurveyFormReview)
