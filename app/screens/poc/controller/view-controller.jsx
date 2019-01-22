var React = require('react');

var UserWindowView = require('../view/user-window-view').view;

var ViewController = React.createClass({

  propTypes: {
    store: React.PropTypes.object.isRequired,
    action: React.PropTypes.object.isRequired,
    dataStore: React.PropTypes.object
  },

  getInitialState: function () {

    var initialState = {
      appData: this.getStore().getData().appData,
      componentProps: this.getStore().getData().componentProps
    };

    return initialState;
  },

  componentWillMount: function () {
    this.props.dataStore.setLocalStorage();
  },

  componentDidMount: function () {
    this.getStore().bind('change', this.handleViewStateChanged);
    this.props.action.registerEvent();
  },

  componentWillUnmount: function () {
    this.getStore().unbind('change', this.handleViewStateChanged);
    this.props.action.deRegisterEvent();
  },

  handleViewStateChanged: function () {

    var changedState = {
      appData: this.getStore().getData().appData,
      componentProps: this.getStore().getData().componentProps
    };

    this.setState(changedState);
  },

  getStore: function () {
    return this.props.store;
  },

  render: function () {
    let oAppData = this.state.appData;
    let oComponentProps = this.state.componentProps;
    let aChatHistory = oAppData.chatHistory;
    let oUserInfo = oAppData.userInfo;
    let sSelectedChatWindowId = oComponentProps.getSelectedChatWindowId();

    return (
        <div className="viewsContainer">
          <UserWindowView ambientColor="#eee" userId="andre" friendUserId="joao" chatHistory={aChatHistory} selectedChatWindowId={sSelectedChatWindowId} userInfo={oUserInfo}/>
          <UserWindowView ambientColor="#ddd" userId="joao" friendUserId="andre" chatHistory={aChatHistory} selectedChatWindowId={sSelectedChatWindowId} userInfo={oUserInfo}/>
        </div>
    );
  }

});

module.exports = ViewController;