'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Page({
    data: {
        current: 0,
        inkBarStyle: {
            'width': '30%'
        },
        pxList: [{}, {}, {}],
        lcList: [{}, {}, {}]
    },
    handleChange: function handleChange(e) {
        var index = e.detail.index;
        this.setData({
            current: index
        });
    }
});