import React, {Component} from 'react';

class Header extends Component {

    render() { 
        return ( 
        <nav className="blue"> 
            <div className="nav-wrapper">
                <a className = "left brand-logo" style={{marginLeft:"20px"}}>
                    Clue
                </a>
                <ul className="right">
                    <li>
                        <a> Login With Google </a>
                    </li>
                </ul>
            </div>
        </nav> 
            );
    }
}
 
export default Header;