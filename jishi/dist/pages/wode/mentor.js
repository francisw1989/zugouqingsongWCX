'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Page({
    data: {
        list: [{
            name: '章三', show: true, children: [{ name: '里斯', show: true, children: [{ name: '都是' }, { name: '都是' }, { name: '都是' }] }, { name: '里斯', show: true, children: [{ name: '都是' }, { name: '都是' }] }, { name: '里斯', show: true, children: [{ name: '都是' }, { name: '都是' }, { name: '都是' }] }]
        }],
        height: 348
    },
    show1: function show1(e) {
        var t = this;
        var i = e.currentTarget.dataset.index;
        if (t.data.list[i].show) {
            t.data.list[i].show = false;
        } else {
            t.data.list[i].show = true;
        }
        t.setData({
            list: t.data.list
        });
    },
    show2: function show2(e) {
        var t = this;
        var i = e.currentTarget.dataset.index;
        debugger;
        if (t.data.list[0].children[i].show) {
            t.data.list[0].children[i] = false;
        } else {
            t.data.list[0].children[i] = true;
        }
        t.setData({
            list: t.data.list
        });
    },
    setSize: function setSize() {
        var t = this;
        var query = wx.createSelectorQuery();
        query.select('#map').boundingClientRect();
        query.exec(function (res) {
            t.setData({
                boxHeight: res[0].height
            });
        });
    },
    onLoad: function onLoad() {
        var t = this;
        setTimeout(function () {
            t.setSize();
        }, 1000);
    }
});