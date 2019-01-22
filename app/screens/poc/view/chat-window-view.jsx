var React = require('react');
var EventBus = require('../../../libraries/eventdispatcher/EventDispatcher');
var MessageTextBoxView = require('./message-textbox-view').view;
var _ = require('lodash');

var Events = {
  HANDLE_MESSAGE_SENT: "handle_message_sent",
  HANDLE_CHAT_WINDOW_CLICKED: "handle_chat_window_clicked"
};

var ChatWindowView = React.createClass({

  propTypes: {
    userId: React.PropTypes.string,
    friendUserId: React.PropTypes.string,
    userInfo: React.PropTypes.object,
    isSelected: React.PropTypes.bool,
    chatHistory: React.PropTypes.array
  },

  getUserDetailsById: function(sId){
    return this.props.userInfo[sId];
  },

  getHeaderView: function(){
    let oUserDetails = this.getUserDetailsById(this.props.friendUserId);

    return (<div className="chatWindowHeader">
      <div className="headerUserName">{oUserDetails.name}</div>
    </div>)
  },

  getMessageBoxView: function(){
    let that = this;
    let aChatHistory = this.props.chatHistory;
    let sMyUserId = this.props.userId;
    let aChatViews = [];

    _.forEach(aChatHistory, function (oChatSlice) {
      let sClassName = "chatSlice " + (oChatSlice.userId === sMyUserId ? "chatSliceAlignRight" : "chatSliceAlignLeft");
      let sUserName = oChatSlice.userId === sMyUserId ? "Me" : that.getUserDetailsById(oChatSlice.userId).name;
      let sChatMessage = oChatSlice.message;
      let sTimeStamp = new Date(oChatSlice.timestamp).toLocaleString();

      aChatViews.push(<div className={sClassName} key={oChatSlice.timestamp}>
        <div className="chatSliceUserName">{sUserName}</div>
        <div className="chatSliceUserMessage">{sChatMessage}</div>
        <div className="chatSliceTimestamp">{sTimeStamp}</div>
      </div>);
    });

    return (<div className="chatWindowMessageContainer">
      {aChatViews}
    </div>)
  },

  handleSendMessage: function(sMessage) {
    EventBus.dispatch(Events.HANDLE_MESSAGE_SENT, this, sMessage, this.props.userId)
  },

  getMessageTextBoxView: function(){
    return <MessageTextBoxView sendHandler={this.handleSendMessage}/>;
  },

  handleChatWindowClicked: function(){
    EventBus.dispatch(Events.HANDLE_CHAT_WINDOW_CLICKED, this, this.props.userId)
  },

  render: function () {
    let sClassName = "chatWindowViewContainer " + (this.props.isSelected ? "windowSelected" : "");

    return (
        <div className={sClassName} onClick={this.handleChatWindowClicked}>
          {this.getHeaderView()}
          {this.getMessageBoxView()}
          {this.getMessageTextBoxView()}
        </div>
    );

  }

});

exports.view = ChatWindowView;
exports.event = Events;