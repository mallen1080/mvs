var Dispatcher = require('../dispatcher/dispatcher');

var VideoActions = {

  changeVideo: function (videoId, e) {

    var action = {
      actionType: "CHANGE_VIDEO",
      videoId: videoId,
      playlistItem: e.currentTarget
    };

    Dispatcher.dispatch(action);
  }
};

module.exports = VideoActions;
