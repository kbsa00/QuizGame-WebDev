import React, { Component } from 'react'



class Dashboard extends Component {  
  render() {
    return (
      <div>
            <div className="jumbotron">
                <div className="container">
                    <h1 className="display-3">Welcome back,{' '+this.props.username}</h1>
                     <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                    ea commodo consequat. Duis aute irure dolor in reprehenderitin voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                    sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
            </div> 
      </div>
    );
  }
}

export default Dashboard;
