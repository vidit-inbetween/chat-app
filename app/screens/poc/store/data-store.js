var _ = require('lodash');

var MockData = require('./../tack/mock-data');

var DataStore = (function () {

  return {

    oData: MockData,

    setLocalStorage: function () {

      try {
        if(localStorage.mockData){
          this.oData = JSON.parse(localStorage.mockData);
        } else {
          localStorage.mockData = JSON.stringify(MockData);
        }
      } catch (e){
        this.oData = MockData;
        console.log("Error parsing mock from localStorage");
      }

      window.onbeforeunload = function () {

        if(localStorage.mockData){
          localStorage.mockData = JSON.stringify(DataStore.getData());
        }
      };
    },

    getData: function () {
      return this.oData;
    }

  };

})();

module.exports = DataStore;