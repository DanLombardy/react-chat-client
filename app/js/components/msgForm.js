var React = require('react');

module.exports = React.createClass({
	handleChange: function() {
    this.props.onInputChange();
  },
  render: function() {
		return (
			<form onSubmit={this.props.submit}>
				<input type="text" size="40" placeholder="Type your message here" onChange={this.handleChange} />
				<button>Post it!</button>
			</form>
		);
	}
});
