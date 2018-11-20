import React, {Component} from 'react'
import Header from './Header'; 
import Footer from './Footer';
import Landing from './Landing';
import Login from './Login'; 
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import registration from '../components/registrationform/Registration';
import Game from './socketComponents/Game';
import GameQuiz from './socketComponents/GameQuiz';
import pagenotfound from './pagenotfound';


class App extends Component{
    render(){
        return(
            <div>
                <BrowserRouter>
                 <div>
                 <Header/>
                 <Switch>
                    <Route exact path='/' component={Landing}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={registration}/>
                    <Route path='/gamestart' component={Game}/>
                    <Route path='/gamequiz:match' component={GameQuiz}/>
                    <Route path='*' component={pagenotfound}/>
                 </Switch>
                 </div>
                </BrowserRouter>
               <Footer/>
            </div>
        )
    }
}


export default App
