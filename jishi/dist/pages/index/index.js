'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var app = getApp();
exports.default = Page({
    data: {
        leve: 1,
        name: '',
        names: ['一星技师', '二星技师', '三星技师'],
        tags: ['', '', '', ''],
        color: ''
    },
    setting: function setting() {
        var t = this;
        t.setData({
            leve: app.globalData.leve,
            name: t.data.names[app.globalData.leve - 1],
            color: app.globalData.color
        });
    },
    onShow: function onShow() {
        var t = this;
        t.setting();
    },
    addTag(){
        wx.navigateTo({
            url: 'tag',
        })
    }
});