import React, {Component} from 'react'
import Header from './Header'; 
import Footer from './Footer';
import Landing from './Landing';
import Login from './Login'; 


class App extends Component{
    
    constructor(props){
        super(props)
    }
    
    render(){
        return(
            <div>
                <Header/>
                 <Landing/> 
                 <Login/>
                 <Footer/>
            </div>
        )
    }
}

export default App; 
