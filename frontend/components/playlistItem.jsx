var React = require('react');
var videoActions = require('../actions/videoActions');
var parseTitleString = require('../sharedFuncs').parseTitleString;

var PlaylistItem = React.createClass({

  render: function () {
    var imgUrl = this.props.video.snippet.thumbnails.medium.url;
    var artist = parseTitleString(this.props.video.snippet.title).artist;
    var title = parseTitleString(this.props.video.snippet.title).title;
    var vidId = this.props.video.snippet.resourceId.videoId;
    var video = { title: title, videoId: vidId };

    return (
      <li className="tile" onClick={videoActions.changeVideo.bind(null, vidId)}>
        <div className="video-img-cont">
          <img src={imgUrl} />
          <span className="playlist-add" onClick={videoActions.addVideoToQueue.bind(null, video)}>+ Playlist</span>
        </div>
        <div className="video-text">
          <p className="video-artist">{artist}</p>
          <p className="video-title">{title}</p>
        </div>
      </li>
    );
  }

});

module.exports = PlaylistItem;
