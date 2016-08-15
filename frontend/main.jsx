var React = require('react');
var ReactDOM = require('react-dom');
var Playlist = require('./playlist');
var SearchBar = require('./searchBar');
var apiUtil = require('./apiUtil');
var playlistInfo = require('./playlistInfo');
var dateParse = require('./sharedFuncs').dateParse;

var Main = React.createClass({

  getInitialState: function () {
    return { videoId: "", videoStats: null };
  },

  changeVideo: function (videoId, e) {
    $('.playing').removeClass('playing');
    if (e) { $(e.currentTarget).addClass("playing"); }
    this.setState({ videoId: videoId });
    apiUtil.getVideoStats(videoId, this.setVideoStats);
    $("html, body").animate({ scrollTop: 0 }, 1500);
  },

  setVideoStats: function (stats) {
    this.setState({ videoStats: stats });
  },

  commafy: function (num) {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },

  playlists: function () {
    return playlistInfo.map(function (playlist, i) {
      return <Playlist display={playlist.display}
        playlistId={playlist.playlistId}
        title={playlist.title}
        changeVideo={this.changeVideo}
        key={i}/>;
    }.bind(this));
  },

  videoStats: function () {
    var stats = this.state.videoStats;
    var up = parseInt(stats.statistics.likeCount);
    var down = parseInt(stats.statistics.dislikeCount);
    var views = stats.statistics.viewCount;
    var pub = stats.snippet.publishedAt;

    return (
      <div className="video-stats">
        <p>{this.commafy(views)} views</p>
        <p>{Math.floor(100 * (up / (up + down)))}% likes</p>
        <p>{dateParse(pub)}</p>
      </div>
    );
  },

  render: function () {
    var link = "https://www.youtube.com/embed/" + this.state.videoId + "?autoplay=1&showinfo=0";
    var videoKlass = this.state.videoId ? "video-container" : "hide";
    var navbarKlass = this.state.videoId ? "hide" : "navbar";
    var videoStats = this.state.videoStats ? this.videoStats() : <div></div>;

    return (
      <div className="container">

        <div className="navbar group">
          <div className="navbar-contents group">
            <div className="logo"><span>Music</span><span>Tiger</span></div>
            <SearchBar changeVideo={this.changeVideo}/>
          </div>
        </div>

        <div className="video-section group">
          <div className={videoKlass}>
            <iframe src={link} frameBorder="0" allowFullScreen></iframe>
          </div>
          {videoStats}
        </div>

        <div className="playlists">
          {this.playlists()}
        </div>

        <div className="footer"></div>
      </div>
    );
  }

});

$(
  function () {
    ReactDOM.render(<Main />, document.getElementById("main"));
  }
);
