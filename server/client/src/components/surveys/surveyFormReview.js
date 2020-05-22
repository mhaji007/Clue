// SurveyFormReview shows use their form
// inputs for review
import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import formFields from './formFields';

const SurveyFormReview = ({onCancel, formValues}) => {
    
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
        </div>

     );
};

function mapStateToProps(state) {
    return {
        formValues:state.form.surveyForm.values

    
};

}
 
export default connect(mapStateToProps)(SurveyFormReview)
