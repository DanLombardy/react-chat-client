var socket = io();
var React = require('react');
var ReactDOM = require('react-dom');

var enums = require("./../../enums");

var Modal = require('./components/modal');
var UserList = require('./components/user_list');
var MessageList = require('./components/message_list');


if (typeof window !== 'undefined') {
    window.React = React;
}

var Application = React.createClass({
  getInitialState:function() {
    return {
      userName: undefined,
      messages: [],
      users: [],
      modalIsOpen: true,
      showTypingIndicator: false
    }
  },

  openModal: function() {
    this.setState({modalIsOpen: true});
  },

  closeModal: function() {
    this.setState({modalIsOpen: false});
  },

  login: function(userName){
    this.closeModal();
    this.setState({userName: userName});
    socket.emit(enums.LOGIN, userName );
  },

  componentDidMount: function(){
    socket.on(enums.USER_LIST, this.onUsersUpdated);
    socket.on(enums.MESSAGE, this.addMessage);
  },

  onUsersUpdated: function(users){
    this.setState({users: users});
  },

  addMessage: function(message){
    this.setState({messages: this.state.messages.concat(message)});
    this.setState({showTypingIndicator: false});

  },

  sendMessage: function(message) {
		socket.emit(enums.MESSAGE, message);
	},

  onInputChange: function() {
		this.setState({showTypingIndicator: true});
	},

  render: function () {
    return (

      <div>
        <h1>Chat App</h1>
        <div>
          <UserList users = {this.state.users}  />
        </div>
        <div>
          <MessageList sendMessage = {this.sendMessage} messages = {this.state.messages}
            onInputChange = {this.onInputChange} showTypingIndicator = {this.state.showTypingIndicator}/>
        </div>
        {this.state.modalIsOpen ? <Modal login = {this.login} userName={this.state.userName}/> : undefined}
      </div>
    )
  }
});

window.application = ReactDOM.render(<Application/>, document.getElementById("root"));
