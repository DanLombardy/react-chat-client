var React = require('react');

module.exports = React.createClass({
	handleChange: function() {
    this.props.onInputChange();
  },

  handleClick: function(event) {
		event.preventDefault();
		this.props.sendMessage(this.refs.input.value);
		this.refs.input.value = "";
		return false;
	},

	render: function() {
		return (
			<form onSubmit={this.props.submit}>
				<input ref="input" type="text" size="40" placeholder="Type your message here" onChange={this.handleChange} />
				<button onClick={this.handleClick}>Post it!</button>
			</form>
		);
	}
});
