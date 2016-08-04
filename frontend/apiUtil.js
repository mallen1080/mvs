var apiUtil = {

  getPlaylist: function (playlistId, callback) {
    $.ajax({
      method: "GET",
      url: "api/playlist",
      data: { playlist: playlistId },
      dataType: "json",
      success: callback
    });
  }

};

module.exports = apiUtil;
