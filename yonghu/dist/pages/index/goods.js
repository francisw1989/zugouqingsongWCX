'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Page({
    data: {
        list: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        current: 0,
        tabStyle: {
            'color': '#333',
            'width:': '60px'
        },
        activeTabStyle: {},
        tabItems: [{ name: '酒水' }, { name: '果盘' }, { name: '养身茶' }, { name: '小吃' }],
        height: wx.DEFAULT_CONTENT_HEIGHT,
        customStyle: {
            'background-color': '#f71429',
            'border': '2px solid #fff'
        }

    },
    handleChange: function handleChange(e) {
        console.log(e);
        var index = e.detail.index;
        this.setData({
            current: index
        });
    },
    onLoad: function onLoad() {
        var t = this;
        var query = wx.createSelectorQuery();
        query.select('#seachWap2').boundingClientRect();
        query.exec(function (res) {
            //res就是 所有标签为mjltest的元素的信息 的数组
            console.log(res);
            //取高度
            t.setData({
                height: t.data.height - res[0].height
            });
            console.log(t.data.height);
        });
    }
});