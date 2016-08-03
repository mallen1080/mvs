var React = require('react');
var ReactDOM = require('react-dom');
// var apiUtil = require('./apiUtil');

var Main = React.createClass({

  getInitialState: function () {
    return {  };
  },

  render: function () {

    return (
      <div>hi</div>
    );
  }

});

$(
  function () {
    ReactDOM.render(<Main />, document.getElementById("main"));
  }
);
