var React = require('react');
var VideoStore = require('../stores/videoStore');
var videoActions = require('../actions/videoActions');

var VideoQueue = React.createClass({

  getInitialState: function () {
    return { videoList: [] };
  },

  componentDidMount: function () {
    this.getVQListener = VideoStore.addListener(this.setVideoList);
  },

  componentWillUnmount: function () {
    this.getVQListener.remove();
  },

  setVideoList: function () {
    this.setState({ videoList: VideoStore.videoQueue() });
  },

  videoQueue: function () {
    return this.state.videoList.map(function (video, i) {
      return (
        <li key={i}>
          <p onClick={videoActions.changeVideo.bind(null, video.videoId)}>{video.title}</p>
          <span onClick={videoActions.removeFromQueue.bind(null, i)}>x</span>
        </li>
      );
    });
  },

  render: function () {
    var title = this.state.videoList.length ? <h2>Playlist</h2> : <h2></h2>;

    return (
      <div className="video-queue">
        {title}
        <ul>
          {this.videoQueue()}
        </ul>
      </div>
    );
  }

});

module.exports = VideoQueue;
