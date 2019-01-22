var React = require('react');
var ViewController = require('./app/screens/poc/controller/view-controller.jsx');
var ViewStore = require('./app/screens/poc/store/view-store.js');
var DataStore = require('./app/screens/poc/store/data-store.js');
var ViewAction = require('./app/screens/poc/action/view-action.js');
require("react-tap-event-plugin")();

React.render(<ViewController dataStore={DataStore} store={ViewStore} action={ViewAction}/>,
                document.getElementById('container'));


