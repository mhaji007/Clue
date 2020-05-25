import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchSurveys} from '../../actions';

class Surveylist extends Component {
    componentDidMount() {
        this.props.fetchSurveys();
    }

    renderSurveys() {
        return this.props.surveys.map(survey => {
            return (
                <div className= "card darken-1" key={survey._id}>
                    <div className = "card-content  grey lighten-4">
                        <span className = "card-title"> {survey.title}</span>
                        <p>
                            {survey.body}
                        </p>
                        <p className="right">
                            Sent on: {new Date(survey.dateSent).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="card-action grey lighten-5">
                        <a  className="blue-text text-darken-2"> Yes: {survey.yes}</a>
                        <a  className="blue-text text-darken-2"> No: {survey.no}</a>
                    </div>
                </div>
            );
        });
    }

    render() { 
        return ( 
            <div>
            
            {this.renderSurveys()}
            
            </div>

         );
    }
}

function mapStateToProps({surveys}) {
    return {surveys};
    
}
 
export default connect(mapStateToProps, {fetchSurveys})(Surveylist);
