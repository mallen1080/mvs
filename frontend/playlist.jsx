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

  playlistItem: function (video, i) {
    var imgUrl = video.snippet.thumbnails.medium.url;
    var artist = video.snippet.title.split(" - ")[0];
    var title = video.snippet.title.split(" - ")[1];
    var vidId = video.snippet.resourceId.videoId;
    
    return (
      <div key={i} className="tile" onClick={this.props.changeVideo.bind(null, vidId)}>
        <div className="video-img-cont">
          <img src={imgUrl} />
        </div>
        <div className="video-text">
          <p className="video-artist">{artist}</p>
          <p className="video-title">{title}</p>
        </div>
      </div>
    );
  },

  render: function () {
    var list = this.state.playlist.slice(0,this.state.display).map(this.playlistItem);

    return (
      <div className="playlist">
        <h3>{this.props.title}</h3>
        {list}
      </div>
    );
  }

});

module.exports = Playlist;
