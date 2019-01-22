var _ = require('lodash');

var eventBus = require('../../../libraries/eventdispatcher/EventDispatcher.js');

var ViewStore = require('../store/view-store');

var ChatWindowViewEvents = require('../view/chat-window-view').event;

var ViewAction = (function () {

  var oEventHandler = {};

  var handleMessageSent = function (sContext, sMessage, sUserId) {
    ViewStore.handleMessageSent(sMessage, sUserId);
  };

  var handleChatWindowClicked = function (sContext, sUserId) {
    ViewStore.handleChatWindowClicked(sUserId);
  };

  var initiateEventHandler = function () {
    var _setEvent = _.set.bind(this, oEventHandler);

    _setEvent(ChatWindowViewEvents.HANDLE_MESSAGE_SENT, handleMessageSent);
    _setEvent(ChatWindowViewEvents.HANDLE_CHAT_WINDOW_CLICKED, handleChatWindowClicked);
  }.call(this);

  return {
    //Register Event Listener
    registerEvent: function () {
      _.forEach(oEventHandler, function (oHandler, sEventName) {
        eventBus.addEventListener(sEventName, oHandler);
      });
    },

    //De-Register Event Listener
    deRegisterEvent: function () {
      _.forEach(oEventHandler, function (oHandler, sEventName) {
        eventBus.removeEventListener(sEventName, oHandler);
      });
    }

  }

})();

module.exports = ViewAction;