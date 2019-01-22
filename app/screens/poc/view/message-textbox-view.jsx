var React = require('react');
var _ = require('lodash');

var Events = {
};

var MessageTextBoxView = React.createClass({

  propTypes: {
    sendHandler: React.PropTypes.func
  },

  getInitialState: function () {

    var initialState = {
      text: ""
    };

    return initialState;
  },


  handleTextChanged: function(oEvent){
    let sText = oEvent.target.value;
    this.setState({text: sText});
  },

  handleSendButtonClicked: function(){
    this.props.sendHandler.call(null, this.state.text);
    this.setState({text: ""});
  },

  render: function () {

    return (
        <div className="messageTextBoxViewContainer">
          <textarea className="messageTextInput" onChange={this.handleTextChanged} value={this.state.text}/>
          <button className="messageTextButton" onClick={this.handleSendButtonClicked}>Send</button>
        </div>
    );

  }

});

exports.view = MessageTextBoxView;
exports.event = Events;