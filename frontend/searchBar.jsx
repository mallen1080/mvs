var React = require('react');
var ApiUtil = require('./apiUtil');
var parseTitleString = require('./sharedFuncs').parseTitleString;
var dateAgo = require('./sharedFuncs').dateAgo;

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
    var that = this;
    return this.state.results.map(function (video, i) {
      var artist = parseTitleString(video.snippet.title).artist;
      var title = parseTitleString(video.snippet.title).title;
      var timeAgo = dateAgo(video.snippet.publishedAt);
      var videoId = video.id.videoId;

      return (
        <li key={i} onClick={that.props.changeVideo.bind(null, videoId)}>
          <div className="search-img-container">
            <img src={video.snippet.thumbnails.default.url} />
          </div>
          <div className="search-text">
            <p>{title}</p>
            <p>{artist}</p>
            <p>released: {timeAgo}</p>
          </div>
        </li>
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
