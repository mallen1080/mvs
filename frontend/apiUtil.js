var apiUtil = {

  getPlaylist: function (playlistId, callback) {
    $.ajax({
      method: "GET",
      url: "api/playlist",
      data: { playlist: playlistId },
      dataType: "json",
      success: callback
    });
  },

  getVideoStats: function (videoId, callback) {
    $.ajax({
      method: "GET",
      url: "api/videostats",
      data: { videoId: videoId },
      dataType: "json",
      success: callback
    });
  }

};

module.exports = apiUtil;
