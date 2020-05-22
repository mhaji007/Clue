// SurveyFormReview shows use their form
// inputs for review

import React from 'react';
import {connect} from 'react-redux';

const SurveyFormReview = ({onCancel}) => {
    return ( 
        <div>
        <h5>Please cofirm your entries</h5>
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
