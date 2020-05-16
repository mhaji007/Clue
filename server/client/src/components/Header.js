import React, {Component} from 'react';
import {connect} from 'react-redux';


class Header extends Component {

    renderContent() {
        switch (this.props.auth) {
            case null:
                return 'Still deciding';
            case false:
                return 'Im logged out';
                
            default:
                return 'Im logged in';
        }
    }

    render() { 
        console.log(this.props);
        return ( 
        <nav className="blue"> 
            <div className="nav-wrapper">
                <a className = "left brand-logo" style={{marginLeft:"20px"}}>
                    Clue
                </a>
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