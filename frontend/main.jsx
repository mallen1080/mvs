var React = require('react');
var ReactDOM = require('react-dom');
// var apiUtil = require('./apiUtil');

var Main = React.createClass({

  getInitialState: function () {
    return {  };
  },

  render: function () {
    var link = "https://www.youtube.com/embed/kOkQ4T5WO9E";

    return (
      <div className="video-section group">
        <div className="video-container">
          <iframe src={link} frameBorder="0" allowFullScreen></iframe>
        </div>
      </div>
    );
  }

});

$(
  function () {
    ReactDOM.render(<Main />, document.getElementById("main"));
  }
);
