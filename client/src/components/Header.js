import React, {Component} from 'react';
import {connect} from 'react-redux'; 

class Header extends Component{

    renderingContent(){
        switch(this.props.auth){
            case null:
            case false: 
             return <li><a href="/login">Logg in</a></li>

            default: 
            return [
                <li key="1"><a href="/api/logout">Logout</a></li>,
                <li key="2"><a href="/StartGame">Start Game</a></li>
            ]

        }
    }

    render(){
        return(
            <div>
                <nav>
                    <div className="nav-wrapper">
                        <a href="/" className="brand-logo center">APP NAME</a>

                        <ul className="right">
                           {this.renderingContent()}
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}


function mapStateToProps(state){
    return{auth: state.auth};
}

export default connect(mapStateToProps)(Header)
