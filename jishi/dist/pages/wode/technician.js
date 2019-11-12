'use strict';
const app = getApp();
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Page({
    data: {
        current: 0,
        inkBarStyle: {
            'width': '30%'
        },
        leve: 1,
        name: '',
        names: ['一星技师', '二星技师', '三星技师'],
        userInfo:{}
    },
    setting: function setting() {
        var t = this;
        t.setData({
            leve: app.globalData.grade,
            name: t.data.names[app.globalData.leve - 1],
            color: app.globalData.color
        });
    },
    handleChange: function handleChange(e) {
        var index = e.detail.index;
        console.log(index);
        this.setData({
            current: index
        });
    },
    
    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function (options) {
        const t = this;
        debugger
        t.setData({
            userInfo: app.globalData.userInfo,
            current: 0
        })
        t.setting();
        console.log(t.data);
    
    },
});