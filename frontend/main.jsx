var React = require('react');
var ReactDOM = require('react-dom');
var Playlist = require('./playlist');
var apiUtil = require('./apiUtil');

var Main = React.createClass({

  getInitialState: function () {
    return { videoId: "", videoStats: null };
  },

  changeVideo: function (videoId, e) {
    $('.playing').removeClass('playing');
    $(e.currentTarget).addClass("playing");
    this.setState({ videoId: videoId });
    apiUtil.getVideoStats(videoId, this.setVideoStats);
    $("html, body").animate({ scrollTop: 0 }, 1500);
  },

  setVideoStats: function (stats) {
    this.setState({ videoStats: stats.statistics });
  },

  commafy: function (num) {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },

  videoStats: function () {
    return (
      <div className="video-stats">
        <p>Views: {this.commafy(this.state.videoStats.viewCount)}</p>
        <p>Likes: {this.commafy(this.state.videoStats.likeCount)}</p>
        <p>Dislikes: {this.commafy(this.state.videoStats.dislikeCount)}</p>
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
          <div className="logo"><span>Music</span><span>Tiger</span></div>
        </div>
        <div className="video-section group">
          <div className={videoKlass}>
            <iframe src={link} frameBorder="0" allowFullScreen></iframe>
          </div>
          {videoStats}
        </div>
        <div className="playlists">
          <Playlist display={true}
            playlistId="PLFgquLnL59alCl_2TQvOiD5Vgm1hCaGSI"
            title="Popular Videos"
            changeVideo={this.changeVideo} />

          <Playlist display={true}
            playlistId="PLFgquLnL59akA2PflFpeQG9L01VFg90wS"
            title="Newest Videos"
            changeVideo={this.changeVideo} />

          <Playlist display={false}
            playlistId="PLFgquLnL59akXPIHrEZci0oouw4dArE0D"
            title="Electronic"
            changeVideo={this.changeVideo} />

          <Playlist display={false}
            playlistId="PLFgquLnL59altZg1f_Kr1kGUYE6j-NE0M"
            title="Pop"
            changeVideo={this.changeVideo} />

          <Playlist display={false}
            playlistId="PLH6pfBXQXHEBElcVFl-gGewA2OaATF4xL"
            title="Hip-Hop"
            changeVideo={this.changeVideo} />

          <Playlist display={false}
            playlistId="PLhd1HyMTk3f5S98HGlByL2eH1T3n6J-bR"
            title="Rock"
            changeVideo={this.changeVideo} />
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
