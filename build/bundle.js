/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	var socket = io();

	var MessageList = React.createClass({
	  displayName: 'MessageList',

	  getInitialState: function () {
	    return {
	      messages: [{
	        timestamp: Date.now(),
	        text: "Welcome to the chat app!"
	      }]
	    };
	  },
	  componentDidMount: function () {
	    socket.on('messageAdded', this.onMessageAdded);
	  },

	  onMessageAdded: function (message) {
	    this.setState({ messages: this.state.messages.concat(messages) });
	  },

	  postIt: function (e) {
	    e.preventDefault();

	    var input = React.findDOMNode(this.refs.theForm).children[0];
	    var message = {
	      timeStamp: Date.now(),
	      text: input.value
	    };

	    this.setState({ messages: this.state.messages.concat(message) });

	    input.value = '';

	    socket.emit('messageAdded', message);
	  },

	  render: function () {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'h2',
	        null,
	        'Messages'
	      ),
	      React.createElement(
	        'ul',
	        { className: 'message-list' },
	        this.state.messages.map(function (message) {
	          return React.createElement(
	            'li',
	            { key: message.timestamp },
	            message.text
	          );
	        })
	      ),
	      React.createElement(MessageForm, { submit: this.postIt, ref: 'theForm' })
	    );
	  }
	});

	var MessageForm = React.createClass({
	  displayName: 'MessageForm',

	  render: function () {
	    return React.createElement(
	      'form',
	      { onSubmit: this.props.submit },
	      React.createElement('input', { type: 'text', size: '40', placeholder: 'Type your message here' }),
	      React.createElement(
	        'button',
	        null,
	        ' Post it!'
	      )
	    );
	  }
	});

	React.render(React.createElement(MessageList, null), document.getElementById('messages'));

/***/ }
/******/ ]);