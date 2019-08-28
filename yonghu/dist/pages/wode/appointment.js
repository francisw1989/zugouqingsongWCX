'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Page({
    data: {
        tabs: ['待支付', '已支付', '已完成', '取消'],
        current: 0,
        inkBarStyle: {
            'width': '30%'
        },
        list: [{}, {}, {}]
    },
    handleChange: function handleChange(e) {
        console.log(e);
        var index = e.detail.index;
        this.setData({
            current: index
        });
    }
});