var React = require('react');
var ApiUtil = require('./apiUtil');

var SearchBar = React.createClass({

  getInitialState: function () {
    return { results: [] };
  },

  componentDidMount: function () {
    $(document).click(function () {
      this.setState({ results: [] });
    }.bind(this));
  },

  searchVideos: function (e) {
    if (e.target.value.length > 2) {
      ApiUtil.searchVideos(e.target.value, this.receiveResults);
    } else {
      this.setState({ results: [] });
    }
  },

  receiveResults: function (results) {
    this.setState({ results: results.items });
  },

  searchResultItems: function () {
    return this.state.results.map(function (video, i) {
      var name = video.snippet.title;
      return (
        <li key={i}>{name}</li>
      );
    });
  },

  render: function () {


    return (
      <div className="search-box">
        <input type="text" onChange={this.searchVideos} placeholder="search videos..."/>
        <ul className="search-results">
          {this.searchResultItems()}
        </ul>
      </div>
    );
  }

});

module.exports = SearchBar;
