var Dispatcher = require('../dispatcher/dispatcher');

var VideoActions = {

  changeVideo: function (videoId, e) {
    if (e.target.className === "playlist-add") { return; }

    var action = {
      actionType: "CHANGE_VIDEO",
      videoId: videoId,
      playlistItem: e.currentTarget
    };

    Dispatcher.dispatch(action);
  },

  addVideoToQueue: function (video) {
    var action = {
      actionType: "ADD_VIDEO_TO_QUEUE",
      video: video
    };

    Dispatcher.dispatch(action);
  },

  removeFromQueue: function (i) {
    var action = {
      actionType: "REMOVE_FROM_QUEUE",
      i: i
    };

    Dispatcher.dispatch(action);
  }
};

module.exports = VideoActions;
