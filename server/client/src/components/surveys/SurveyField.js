// SurveyField contains logic to render a single
// label and input text
//  the value in the text input is saved through
// the use of props

// receives props from Field
import React from 'react';

export default({input, label, meta:{error, touched}}) => {
    return ( 
        <div className="input-field">
            <label>{label}</label>
            <input {...input} style={{marginBottom:'5px'}}/>
            <div className="red-text" style={{marginBottom:'20px'}}>
            {touched&&error}
            </div>
        </div>
     );
};
 
 