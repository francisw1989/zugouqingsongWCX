'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    time: '',
    cIndex: '-1'
  },
  chose: function chose(e) {
    console.log('323');
    var t = this;
    t.setData({
      cIndex: e.target.dataset.index
    });
  },

  bindTimeChange: function bindTimeChange(e) {
    this.setData({
      time: e.detail.value
    });
  }
});