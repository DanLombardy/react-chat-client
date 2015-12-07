var React = require('react');
var MessageForm = require('./msgForm.js');
var TypingIndicator = require('./components/showTyping.js');


module.exports= exports = React.createClass({
	render: function() {
		return (
			<div>
				<h2>Messages</h2>
				<ul className="message-list">
					{this.props.messages.map(function(message, index) {
						return(
							<li key={index}>{message.username}: {message.message}</li>
						);
					})}
				</ul>
				<MessageForm sendMessage ={this.props.sendMessage} onInputChange = {this.props.onInputChange} ref="theForm" />
				{this.props.showTypingIndicator ? <TypingIndicator />: null}
			</div>
		);
	}
});
