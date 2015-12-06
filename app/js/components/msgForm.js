var React = require("react");

module.exports = React.createClass({
	render: function() {
		return (
			<form onSubmit={this.props.submit}>
				<input type="text" size="40" placeholder="Type your message here" />
				<button>Post it!</button>
			</form>
		);
	}
});
