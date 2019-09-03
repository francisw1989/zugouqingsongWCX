'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Page({
    data: {
        tags: ['安静', '安静', '安静', '安静', '安静'],
        list: [{ showMore: false }, { showMore: false }],
        lcList: [{ time: '', content: '今天09:20   服务完成' }, { time: '', content: '今天09:00   到店后开始服务' }, { time: '', content: '昨天09:20   预约' }]
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