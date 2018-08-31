import React, { Component } from 'react'
import FormValidator from '../FormValidator/FormValidator'

class Chat extends React.Component {
    /* constructor (props) {
        super(props)
        this.state = {
            inputVal: ''
        }
        this.socket = this.props.socket
        this.onChange = this.onChange.bind(this)
        this.submit = this.submit.bind(this)
    }

    onChange = (e) => {
        let val = e.target.value
        this.setState({
            inputVal:  val
        })
    }

    submit = (e) => {
        let mess = this.state.inputVal
        
    }
    render(){
        const {inputVal} = this.state
        return (
            <div>
                <input value={inputVal} onChange={this.onChange}/>
                <button onClick={this.submit}>Submit</button>
            </div>
        )
    }
*/
constructor(props){
    super(props);
    /* this.validator = new FormValidator([
    {
        field: 'uname',
        method: 'isEmpty',
        validWhen: false,
        message: 'Username is required.'
    },
    {
        field: 'uname',
        method: 'matches',
        args: [/^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/],
        validWhen: true,
        message: 'Username 
    },
    {
        field: 'pwd',
        method: 'isEmpty',
        validWhen: false,
        message: 'Password is required.'
    },
    {
        field: 'pwd',
        method: 'matches',  
        args: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/],
        validWhen: true,
        message: 'a-z / A-Z / 8 minimum'
    },
    ])*/
    this.state = {
        username: localStorage.login,
        message: '',
        messages: []
    }
    this.socket = this.props.socket
    this.socket.on('RECEIVE_MESSAGE', function(data){
        addMessage(data);
    })

    const addMessage = data => {
/*         console.log(data) */
        this.setState({messages: [...this.state.messages, data]})
/*         console.log(this.state.message) */
    };

    this.sendMessage = (e) => {
        e.preventDefault();
        this.socket.emit('SEND_MESSAGE', {
            author: this.state.username,
            message: this.state.message,
        })
        this.setState({message: ''})
/*         console.log(this.state.message) */

    }
}
render(){
    return (
        <div className="container">
            <div className="row">
                <div className="col-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title">Chat</div>
                            <hr/>
                            <div className="messages">
                                {this.state.messages.map((message, key) => {
                                    return (
                                        <div key={key} >{message.author}: {message.message}</div>
                                    )
                                })}
                            </div>

                        </div>
                        <div className="card-footer">
                            <input name="uname" type="text" placeholder="Username" className="form-control" value={this.state.username} readOnly />
                            <br/>
                            <input name="message" type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={e => this.setState({message: e.target.value})}/>
                            <br/>
                            <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
}

export default Chat
