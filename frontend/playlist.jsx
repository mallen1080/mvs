var React = require('react');
var apiUtil = require('./apiUtil');

var Playlist = React.createClass({

  getInitialState: function () {
    var display = this.props.display ? 6 : 0;
    return { playlist: [], display: display };
  },

  componentDidMount: function () {
    apiUtil.getPlaylist(this.props.playlistId, this.receivePlaylist);
  },

  receivePlaylist: function (playlist) {
    this.setState({ playlist: playlist });
  },

  toggleView: function () {
    var display = this.state.display ? 0 : 6;
    this.setState({ display: display });
  },

  displayMore: function () {
    this.setState({ display: this.state.display + 6 });
  },

  playlistItem: function (video, i) {
    var imgUrl = video.snippet.thumbnails.medium.url;
    var artist = video.snippet.title.split(" - ")[0];
    var title = video.snippet.title.split(" - ")[1];
    var vidId = video.snippet.resourceId.videoId + "?autoplay=1";

    return (
      <li key={i} className="tile" onClick={this.props.changeVideo.bind(null, vidId)}>
        <div className="video-img-cont">
          <img src={imgUrl} />
        </div>
        <div className="video-text">
          <p className="video-artist">{artist}</p>
          <p className="video-title">{title}</p>
        </div>
      </li>
    );
  },

  render: function () {
    var list = this.state.playlist.slice(0,this.state.display).map(this.playlistItem);
    var klass = this.state.display ? "playlist active" : "playlist";
    var more = this.state.display && this.state.display < 24 ?
      <button onClick={this.displayMore}>More</button> : "";

    return (
      <div className={klass}>
        <h3 onClick={this.toggleView}>{this.props.title}</h3>
        <ul>
          {list}
        </ul>
        {more}
      </div>
    );
  }

});

module.exports = Playlist;
