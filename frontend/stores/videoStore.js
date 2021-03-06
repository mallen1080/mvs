var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');

var VideoStore = new Store(Dispatcher);

var _currentVideo = null;
var _currentPlaylistItem = null;
var _videoQueue = [];

VideoStore.currentVideo = function () {
  return _currentVideo;
};

VideoStore.currentPlaylistItem = function () {
  return _currentPlaylistItem;
};

VideoStore.videoQueue = function () {
  return _videoQueue;
};

VideoStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case "CHANGE_VIDEO":
      _currentVideo = payload.videoId;
      _currentPlaylistItem = payload.playlistItem;
      this.__emitChange();
      break;
    case "ADD_VIDEO_TO_QUEUE":
      _videoQueue.push(payload.video);
      this.__emitChange();
      break;
    case "REMOVE_FROM_QUEUE":
      _videoQueue.splice(payload.i, 1);
      this.__emitChange();
    }

};

module.exports = VideoStore;
