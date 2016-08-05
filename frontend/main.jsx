var React = require('react');
var ReactDOM = require('react-dom');
var Playlist = require('./playlist');

var Main = React.createClass({

  getInitialState: function () {
    return { videoId: "",  playing: null };
  },

  changeVideo: function (videoId, e) {
    $('.playing').removeClass('playing');
    $(e.currentTarget).addClass("playing");
    this.setState({ videoId: videoId, playing: e.currentTarget });
  },

  render: function () {
    var link = "https://www.youtube.com/embed/" + this.state.videoId;
    var videoKlass = this.state.videoId ? "video-container" : "hide";

    return (
      <div className="container">
        <div className="video-section group">
          <div className={videoKlass}>
            <iframe src={link} frameBorder="0" allowFullScreen></iframe>
          </div>
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
