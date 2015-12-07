var React = require('react');

module.exports = exports = React.createClass({

  render: function(){
    return(
      <div>
        <h2>Users</h2>
        <ul className = "user-list">
          {this.props.users.map(function(user, index){
            return(
              <li key = {index}>{user}</li>
            );
          })}
        </ul>
      </div>
    );
  }
});
