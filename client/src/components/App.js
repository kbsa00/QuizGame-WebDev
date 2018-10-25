import React, {Component} from 'react'
import Header from './Header'; 
import Footer from './Footer';
import Landing from './Landing';
import Login from './Login'; 
import {BrowserRouter, Route, Switch} from 'react-router-dom';
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
                <BrowserRouter>
                 <Switch>
                    <Route exact path='/' component={Landing}/>
                    <Route exact path='/login' component={Login}/>
                 </Switch>
                </BrowserRouter>
               <Footer/>
            </div>
        )
    }
}

export default connect(null, actions)(App);
