import React, { Component } from 'react'; 
import io from 'socket.io-client';
import _ from 'lodash';



class Chat extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      username: this.props.username, 
      message: '', 
      messages: []
    };
    
    if(process.env.NODE_ENV === 'production'){
      this.socket = io('/')
    }else if(process.env.NODE_ENV === 'development'){
      this.socket = io('localhost:3000');
    }
  
    this.socket.on('onRecieve_Message', function(data){
      Addingmsg(data)
    });

    const Addingmsg = data => {
      this.setState({messages: [...this.state.messages, data]})
    }
  }

  sendMessage(){
    this.socket.emit('onSending_Message',{
      username: this.state.username,
      message: this.state.message
    });

    this.setState({message: ''});
  }


  renderMessages(){
    return this.state.messages.map((message, index) => {
      return (<div key={index}> {message.username}: {message.message} </div>)
    });
  }

  render() {
    
    return (
      <div className= 'chatBox'>       
          <div className='row'>
          
            <div className='card chat blue-grey darken-1'>
              <div className='card-body'> 
                <span className='card-title'>Global Chat for players</span>
              </div>

                <div className="allmessages">
                  {this.renderMessages()}
                </div>

              <div className="card-action">
                <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
                <br/>
                <button className="btn btn-primary form-control" onClick={this.sendMessage.bind(this)}>Send</button>
               </div>
            </div>    
        </div>
      </div>
    )
  }
}

export default Chat; 
