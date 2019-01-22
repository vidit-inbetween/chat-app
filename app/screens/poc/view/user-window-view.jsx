var React = require('react');
var ChatWindowView = require('./chat-window-view').view;
var _ = require('lodash');

var Events = {
};

var UserWindowView = React.createClass({

  propTypes: {
    friendUserId: React.PropTypes.string,
    userId: React.PropTypes.string,
    ambientColor: React.PropTypes.string,
    userInfo: React.PropTypes.object,
    chatHistory: React.PropTypes.array,
    selectedChatWindowId: React.PropTypes.string
  },

  render: function () {
    let oProps = this.props;
    let oStyle = {
      backgroundColor: oProps.ambientColor
    };

    let bIsChatWindowSelected = oProps.selectedChatWindowId === oProps.userId;

    return (
        <div className="userWindowViewContainer" style={oStyle}>
          <ChatWindowView isSelected={bIsChatWindowSelected} userId={oProps.userId} friendUserId={oProps.friendUserId} userInfo={oProps.userInfo} chatHistory={oProps.chatHistory}/>
        </div>
    );

  }

});

exports.view = UserWindowView;
exports.event = Events;