'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
const app = getApp();
exports.default = Page({
    data: {
        leve: 1,
        name: '',
        names: ['一星技师', '二星技师', '三星技师'],
        tags: ['', '', '', ''],
        color: '',
        userInfo:{},
    },
    
    onShow(){
        const t = this;
        
    },
    setting: function setting() {
        var t = this;
        t.setData({
            leve: app.globalData.grade,
            name: t.data.names[app.globalData.leve - 1],
            color: app.globalData.color
        });
        console.log(t.data.nowSignText);
    },
    userInfo(){
        const t = this;
        app.userInfo()
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const t = this;
        t.setData({
            userInfo: app.globalData.userInfo
        })
        t.setting();
    },
});