let ViewProps = (function () {

  let sSelectedChatWindowId = "";

  return {
    
    setSelectedChatWindowId: function (sId) {
      sSelectedChatWindowId = sId;
    },

    getSelectedChatWindowId: function () {
      return sSelectedChatWindowId;
    }

  };

})();

module.exports = ViewProps;