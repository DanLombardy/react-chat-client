var socket = io();
var React = require('react');
var ReactDOM = require('react-dom');

var enums = require("./../../enums");

var Connections = require('./components/connections');
var MessageList = require('./components/messageList');

if (typeof window !== 'undefined') {
    window.React = React;
}

var Application = React.createClass({
  getInitialState: function() {
    return {
      messages: [],
      users: [],
      showTypingIndicator: false
    }
  },

  componentDidMount: function() {
    socket.on(enums.MESSAGE, function(message) {
    	this.addMessage(message);
    }.bind(this));
  },

  onUsersUpdated: function(users) {
    this.setState({users: users});
  },

  addMessage: function(message) {
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
          <Connections users={this.state.users} onUsersUpdated={this.onUsersUpdated}/>
        </div>
        <div>
          <MessageList sendMessage={this.sendMessage} messages={this.state.messages}
            onInputChange={this.onInputChange} showTypingIndicator={this.state.showTypingIndicator}/>
        </div>
      </div>
    );
  }
});

window.application = ReactDOM.render(<Application/>, document.getElementById("root"));
