var React = require('react');
var ApiUtil = require('./apiUtil');
var parseTitleString = require('./parseTitleString');

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

  dateAgo: function (dateString) {
    var _MS_PER_DAY = 1000 * 60 * 60 * 24;
    var date = new Date(dateString);
    var today = new Date();

    daysAgo = Math.floor((today - date) / _MS_PER_DAY);
    if (daysAgo < 30) { return daysAgo + " days ago"; }
    if (daysAgo < 365) { return Math.floor(daysAgo / 30) + " months ago"; }
    return Math.floor(daysAgo / 360) + " years ago";
  },

  searchResultItems: function () {
    var that = this;
    return this.state.results.map(function (video, i) {
      var artist = parseTitleString(video.snippet.title).artist;
      var title = parseTitleString(video.snippet.title).title;
      var date = video.snippet.publishedAt;
      var dateAgo = that.dateAgo(date);
      var videoId = video.id.videoId;

      return (
        <li key={i} onClick={that.props.changeVideo.bind(null, videoId)}>
          <div className="search-img-container">
            <img src={video.snippet.thumbnails.default.url} />
          </div>
          <div className="search-text">
            <p>{artist}</p>
            <p>{title}</p>
            <p>{dateAgo}</p>
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
