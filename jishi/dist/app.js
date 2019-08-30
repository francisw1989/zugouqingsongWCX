'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _system = require('./static/utils/system.js');

var _system2 = _interopRequireDefault(_system);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = App({
  globalData: {
    leve: 1,
    colors: ['#459E8C', '#FDBF78', '#8E6BFF'],
    color: '#459E8C'
  },
  setBg: function setBg() {
    var t = this;
    var color = t.globalData.colors[t.globalData.leve - 1];
    t.color = color;
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: color
    });
  },
  onLaunch: function onLaunch() {
    _system2.default.attachInfo();
    this.setBg();
  },
  onShow: function onShow() {},
  onHide: function onHide() {}
});