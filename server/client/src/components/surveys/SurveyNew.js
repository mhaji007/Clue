
import React, {Component} from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

// SurveyNew shows SurveyForm and SurveyFormReview
class SurveyNew extends Component {
    
    state = { showFormReview: false };

    renderContent() {
        if (this.state.ShowFormReview) {
            return <SurveyFormReview/>;
        }
        return (
        <SurveyForm
            onSurveySubmit={() => this.setSate({showFormReview:true})}
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
 
export default SurveyNew;
