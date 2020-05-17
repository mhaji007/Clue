import React, {Component} from 'react'
import StripeCheckout from 'react-stripe-checkout';
import {connect} from 'react-redux';
import * as actions from '../actions'

class Payments extends Component {
    
    render() { 
        return ( 
            <StripeCheckout
            name="Clue"
            description="$5 for 5 email credits"
            amount={500}
            token={token=>this.props.handleToken(token)}
            stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
            <a className="btn purple darken-4">
                <i className="material-icons left"> payment </i>
                ADD CREDITS
            </a>
            </StripeCheckout>
         );
    }
}
 
export default connect(null, actions)(Payments);