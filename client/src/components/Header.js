import React, {Component} from 'react'; 


class Header extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <nav>
                    <div className="nav-wrapper">
                        <a href="#!" className="brand-logo center">APP NAME</a>

                        <ul className="right">
                            <li><a>TITLE</a></li>
                            <li><a>TITLE</a></li>
                            <li><a>TITLE</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}


export default Header
