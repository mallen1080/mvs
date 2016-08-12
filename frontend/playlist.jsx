var React = require('react');
var apiUtil = require('./apiUtil');
var parseTitleString = require('./sharedFuncs').parseTitleString;

var Playlist = React.createClass({

  getInitialState: function () {
    var showCount = this.getShowCount();

    return { playlist: [], showCount: showCount, display: this.props.display };
  },

  componentDidMount: function () {
    apiUtil.getPlaylist(this.props.playlistId, this.receivePlaylist);
    $(window).resize(this.handleResize);
  },

  getShowCount: function () {
    var width = $(window).width();
    if (width > 768) { return 8; }
    if (width > 600) { return 6; }
    return 4;
  },

  handleResize: function () {
    // if (!this.state.display) { return; }
    // var width = $(window).width();
    // if (width > 768 && this.state.display !== 8) {
    //   this.setState({ display: 8 });
    // } else if (width <= 768 && width > 600 && this.state.display !== 6) {
    //   this.setState({ display: 6 });
    // } else if (width <= 600 && this.state.display !== 4){
    //   this.setState({ display: 4 });
    // }
    var showCount = this.getShowCount();
    if (showCount !== this.state.showCount) {
      this.setState({showCount: showCount});
    }
  },

  receivePlaylist: function (playlist) {
    this.setState({ playlist: playlist });
  },

  toggleView: function () {
    // var display = this.state.display ? 0 : 8;
    var display = !this.state.display;
    this.setState({ display: display });
  },

  scrollClick: function (direction, e) {
    var container = $(e.target).prev();

    if (direction === "right") {
      var next = Math.floor((container.scrollLeft() + container.width()) / container.width()) * container.width();
      container.animate({scrollLeft: next}, 400);
    } else {
      container = container.prev();
      var prev = Math.ceil((container.scrollLeft() - container.width()) / container.width()) * container.width();
      container.animate({scrollLeft: prev}, 400);
    }
  },

  onScroll: function (e) {
    var container = $(e.target);
    var next = container.parent().find(".next");
    var prev = container.parent().find(".prev");
    var pos = container.scrollLeft();
    var numLists = container.children().length - 1;

    if (pos < 20) { prev.addClass("hide"); }
    if (pos >= 20 && pos < (numLists * container.width()) - 20) {
      prev.removeClass("hide");
      next.removeClass("hide");
    }
    if (pos >= (numLists * container.width()) - 20) {
      next.addClass("hide");
    }
  },

  playlistItem: function (video, i) {
    var imgUrl = video.snippet.thumbnails.medium.url;
    var artist = parseTitleString(video.snippet.title).artist;
    var title = parseTitleString(video.snippet.title).title;
    var vidId = video.snippet.resourceId.videoId;

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

  playlistGroup: function () {
    var playlist = this.state.playlist;
    var playlistGroups = [];

      for (var i = 0; i < 24; i += this.state.showCount) {
        playlistGroups.push(playlist.slice(i, i + this.state.showCount));
      }

    return playlistGroups.map(function (group, i) {
      return <ul key={i}>{group.map(this.playlistItem)}</ul>;
    }.bind(this));
  },

  render: function () {
    var klass = this.state.display ? "playlist active" : "playlist";
    var listGroup = this.playlistGroup().length ? this.playlistGroup() : <ul></ul>;

    return (
      <div className={klass} id={this.props.title.replace(" ", "-")}>
        <h3 onClick={this.toggleView}>{this.props.title}</h3>
        <div onScroll={this.onScroll} className="playlist-container group">

          {listGroup}

        </div>
        <button className="next" onClick={this.scrollClick.bind(null, "right")}>
          {">"}
        </button>
        <button className="prev hide" onClick={this.scrollClick.bind(null, "left")}>
          {"<"}
        </button>
      </div>
    );
  }

});

module.exports = Playlist;
