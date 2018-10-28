import React, {Component} from 'react';
import {connect} from 'react-redux'; 
import {Link} from 'react-router-dom'; 

class Header extends Component{

    renderingContent(){
        switch(this.props.auth){
            case null:
            case false: 
             return [
                 <li key="login"><Link to="login">Login</Link></li>,
                 <li key="create"><Link to="register">Create a user</Link></li>
                ]
            default: 
            return [
                <li key="1"><a href="/api/logout">Logout</a></li>,
                <li key="2"><Link to="StartGame">Start Game</Link></li>,
                <li key="3"><Link to="Scoreboard">Scoreboard</Link></li>
            ]
        }
    }

    render(){
        return(
            <div>
                <nav>
                    <div className="nav-wrapper">
                        <Link to="/" className="brand-logo center">APP NAME</Link>

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
