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
    this.validator = new FormValidator([
    {
        field: 'message',
        method: 'isEmpty',
        validWhen: false,
        message: 'Please type something.'
    },
    {
        field: 'message',
        method: 'isAscii',
        validWhen: true,
        message: 'Injections are not allowed'
    }
    ])
    this.state = {
        username: localStorage.login,
        message: '',
        messages: [],
        uid: localStorage.id
        
    }
    this.socket = this.props.socket
    this.socket.on('RECEIVE_MESSAGE', function(data){
        addMessage(data);
    })


    const addMessage = data => {
        this.setState({messages: [...this.state.messages, data]})
    };

    this.sendMessage = (e) => {
        e.preventDefault();
        const validation = this.validator.validate(this.state)
        this.setState({ validation })
        this.submitted = true
        if (validation.isValid){
            this.socket.emit('SEND_MESSAGE', {
                author: this.state.username,
                message: this.state.message,
                id: this.state.uid
            })
            this.setState({message: ''})
            console.log(this.state)
        }
    }
    console.log(localStorage)
}
render(){
    let validation = this.submitted ? this.validator.validate(this.state) : this.state.validation
    return (
        <div className="container">
            <div className="row">
                <div className="col-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title" align="center">Chat</div>
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
                            <input type="text" placeholder="Username" className="form-control" value={this.state.username} readOnly />
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
