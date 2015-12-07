var React = require('react');

module.exports = exports = React.createClass({

  render: function() {
    return (
      <div style={this.styles.outterContainer}>
        <div style={this.styles.innerContainer}>
          <h2>Welcome to Generic Chat App</h2>
          <p>Please fill in a username</p>

          <form>
            <input ref="input" type="text" size="100" placeholder="Please enter name" />
            <button onClick={(function (event) { event.preventDefault(); this.props.login(this.refs.input.value); return false; }).bind(this)}>Submit</button>
          </form>
        </div>
      </div>
    );
  },

  styles: {
    outterContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.25)"
    },

    innerContainer: {
      width: 400,
      height: 400,
      margin: "200px auto 0",
      backgroundColor: "white",
      padding: 20,
      borderRadius: 10
    }
  }
});
