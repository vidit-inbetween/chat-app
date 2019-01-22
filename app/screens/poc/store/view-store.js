var _ = require('lodash');

var MicroEvent = require('../../../libraries/microevent/MicroEvent.js');
var ViewProps = require('./model/view-props');
var DataStore = require('./data-store');


var ViewStore = (function () {

  var oAppData = DataStore.getData();
  var oComponentProps = ViewProps;

  var triggerChange = function () {
    ViewStore.trigger('change');
  };

  var getComponentProps = function () {
    return oComponentProps;
  };

  var getAppData = function () {
    return oAppData;
  };

  return {

    getData: function () {
      var data = {
        appData: oAppData,
        componentProps: oComponentProps
      };
      return data;
    },

    handleMessageSent: function (sMessage, sUserId) {
      let oAppData = getAppData();
      let sTimestamp = new Date().getTime();

      oAppData.chatHistory.push({
        userId: sUserId,
        message: sMessage,
        timestamp: sTimestamp
      });

      triggerChange();
    },

    handleChatWindowClicked: function (sUserId) {
      let oComponentProps = getComponentProps();
      oComponentProps.setSelectedChatWindowId(sUserId);

      triggerChange();
    }

  };
})
();

MicroEvent.mixin(ViewStore);

module.exports = ViewStore;