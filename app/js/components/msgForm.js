var React = require('react');

module.exports = React.createClass({
	handleChange: function() {
    this.props.onInputChange();
  },

	render: function() {
		var onClick = (function (event) {
			event.preventDefault();
			this.props.sendMessage(this.refs.input.value);
			this.refs.input.value = "";
			return false;

		}).bind(this);

		return (
			<form onSubmit={this.props.submit}>
				<input ref="input" type="text" size="40" placeholder="Type your message here" onChange={this.handleChange} />
				<button onClick = {onClick}>Post it!</button>
			</form>
		);
	}
});
