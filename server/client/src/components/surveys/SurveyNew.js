
import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

// SurveyNew shows SurveyForm and SurveyFormReview
class SurveyNew extends Component {
    
    state = { showFormReview: false };

    renderContent() {
        if (this.state.showFormReview) {
            return <SurveyFormReview
            onCancel ={()=>this.setState({showFormReview:false})}/>;
        }
        return (
        <SurveyForm
            onSurveySubmit={() => this.setState({showFormReview:true})}
        />
    );
    }
    render() { 
        return (
        <div>
            {this.renderContent()}
        </div> 
         );
    }
}

// Allows for dumping of values on cancel if navigated away from survey new
 
export default reduxForm({

    form: 'surveyForm'

}) (SurveyNew);
