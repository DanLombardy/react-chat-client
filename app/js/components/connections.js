var socket = io();
var React = require('react');
var ReactDOM = require('react-dom');

var enums = require("./../../enums");

var UserList = require('./userList');
var Modal = require('./modal');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      modalIsOpen: true
    }
  },

  componentDidMount: function() {
    socket.on(enums.DISCONNECT, function(username) {
      this.removeUser(username);
    }.bind(this));
  },

  openModal: function() {
    this.setState({modalIsOpen: true});
  },

  closeModal: function() {
    this.setState({modalIsOpen: false});
  },

  addUser: function(username) {
    this.closeModal();
    this.props.users.push(username);
    this.props.onUsersUpdated(this.props.users);

    socket.emit(enums.LOGIN, {
      sender: 'chatbot',
      username: username,
      message: username + " has joined the chat"
    });
  },

  removeUser: function(username) {
    var users = this.props.users;
    var index = users.indexOf(username);
    if (index === -1) return;

    users.splice(index, 1);
    this.props.onUsersUpdated(users);

    socket.emit(enums.LOGOUT, {
      sender: 'chatbot',
      username: username,
      message: username + " has left the chat"
    });
  },

  render: function() {
    return(
      <div>
        <UserList users={this.props.users}/>
        {this.state.modalIsOpen ? <Modal addUser={this.addUser}/> : null}
      </div>
    );
  }
});
