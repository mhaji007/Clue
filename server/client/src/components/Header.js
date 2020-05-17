import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import Logo from '../Logo.PNG';
import './Header.css';
import {Link} from 'react-router-dom';
import Payments from './Payments';


class Header extends Component {

    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <li className="login">
                        <a className="btn red" href="/auth/google"><i className="material-icons right"> exit_to_app </i>Login With Google</a>
                    </li>
                )
                
            default:
                return <Fragment>
                    <li> <Payments/> </li>,
                    <li >
                    <a className="btn red" href="/api/logout"> <i className="material-icons right"> exit_to_app </i> Logout</a>
                    </li>
                </Fragment>;
        }
    }

    render() { 
        console.log(this.props);
        return ( 
        <nav> 
            <div className="nav-wrapper  black">
                <Link to={this.props.auth ? '/surveys': '/'}
                
                className = "left brand-logo">
                    <img src={Logo} alt="clue logo"/>
                </Link>
                <ul className="right">
                    {this.renderContent()}
                </ul>
            </div>
        </nav> 
            );
    }
}

function mapStateToProps({auth}) {
    return {auth};
}
 
export default connect(mapStateToProps)(Header);