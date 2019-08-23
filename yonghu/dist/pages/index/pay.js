'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Page({
    data: {
        list: [{ showMore: false }, { showMore: false }]

    },
    showMore: function showMore(e) {
        var t = this;
        var _showMore = t.data.list[e.currentTarget.dataset.index].showMore;
        t.data.list[e.currentTarget.dataset.index].showMore = _showMore ? false : true;
        t.setData({
            list: t.data.list
        });
    }
});