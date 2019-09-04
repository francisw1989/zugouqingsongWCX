'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
const app = getApp();
exports.default = Page({
    data: {
        tabIndex: 0,
        tabs: ['今天', '明天', '历史', '全部'],
        inkBarStyle: {
            'width': '30%'
        },
        list: [{}, {}, {}]
    },
    
    handleChange: function handleChange(e) {
        var index = e.detail.index;
        this.setData({
            tabIndex: index
        });
    },
    onShow() {
        const t = this;
        
    }
});