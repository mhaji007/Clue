// SurveyField contains logic to render a single
// label and input text
//  the value in the text input is saved through
// the use of props

// receives props from Field
import React from 'react';

export default({input, label}) => {
    return ( 
        <div>
            <label>{label}</label>
            <input {...input}/>
        </div>
     );
};
 
 