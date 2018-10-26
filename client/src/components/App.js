import React, {Component} from 'react'
import Header from './Header'; 
import Footer from './Footer';
import Landing from './Landing';
import Login from './Login'; 
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import registration from '../components/registrationform/Registration';
import * as actions from '../actions';

class App extends Component{

    componentDidMount(){
        this.props.fetchCurrentUser();
    }
    render(){
        return(
            <div>
                <BrowserRouter>
                 <div>
                 <Header/>
                 <Switch>
                    <Route exact path='/' component={Landing}/>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/register' component={registration}/>
                 </Switch>
                 </div>
                </BrowserRouter>
               <Footer/>
            </div>
        )
    }
}

export default connect(null, actions)(App);
