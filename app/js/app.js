// get a reference to the websocket
var socket = io();

var React = require('react');
var ReactDOM = require('react-dom');

// set window.React for integration with React Chrome devtools
if (typeof window !== 'undefined') {
    window.React = React;
}

var MessageList = React.createClass({
	getInitialState: function() {
		return {
			// initialize messages array with welcome message
			messages: [{
				timeStamp: Date.now(),
				text: "Welcome to the test chat app!"
			}]
		};
	},
	componentDidMount: function() {
		// register event handler for new messages received from server
		socket.on('messageAdded', this.onMessageAdded);
	},
	onMessageAdded: function(message) {
		// update the array (setState re-renders the component)
		this.setState({messages: this.state.messages.concat(message)});
	},
	postIt: function(e) {
		// prevent form submission which reloads the page
		e.preventDefault();

		// get the message
		var input = ReactDOM.findDOMNode(this.refs.theForm).children[0];
		var message = {
			timeStamp: Date.now(),
			text: input.value
		};

		// add it locally for this client
		this.setState({messages: this.state.messages.concat(message)});
		/**
		 * Alternatively you could have the server emit to ALL clients,
		 * including the one who sent the message. In that case the message
		 * would go from your client to the server and back before it got added
		 * to the message list.
		 */

		// clear the input
		input.value = '';

		// emit to server so other clients can be updated
		socket.emit('messageAdded', message);
	},
	render: function() {
		return (
			<div>
				<h2>Messages</h2>
				<ul className="message-list">
					{this.state.messages.map(function(message) {
						return(
							<li key={message.timeStamp}>{message.text}</li>
						);
					})}
				</ul>
				<MessageForm submit={this.postIt} ref="theForm" />
			</div>
		);
	}
});

var MessageForm = React.createClass({
	render: function() {
		return (
			<form onSubmit={this.props.submit}>
				<input type="text" size="40" placeholder="Type your message here" />
				<button>Post it!</button>
			</form>
		);
	}
});

// mount to the messages div
ReactDOM.render(<MessageList />, document.getElementById('messages'));
