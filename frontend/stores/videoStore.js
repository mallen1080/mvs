var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');

var VideoStore = new Store(Dispatcher);

var _currentVideo = null;
var _currentPlaylistItem = null;

VideoStore.currentVideo = function () {
  return _currentVideo;
};

VideoStore.currentPlaylistItem = function () {
  return _currentPlaylistItem;
};

VideoStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case "CHANGE_VIDEO":
      _currentVideo = payload.videoId;
      _currentPlaylistItem = payload.playlistItem;
      this.__emitChange();
    }

};

module.exports = VideoStore;
