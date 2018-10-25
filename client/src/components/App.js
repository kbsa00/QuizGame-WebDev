import React, {Component} from 'react'
import Header from './Header'; 
import Footer from './Footer';
import Landing from './Landing';
import Login from './Login'; 
import {BrowserRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions';

class App extends Component{
    
    componentDidMount(){
        this.props.fetchCurrentUser();
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

export default connect(null, actions)(App);
