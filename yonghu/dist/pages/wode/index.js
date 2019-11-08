'use strict';
const app = getApp();
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Page({
    data: {
        userInfo: {},
        memberLevelName: app.globalData.memberLevelName
    },
    userInfo(){
        app.userInfo();
    },
    onShow() {
        const t = this;
        let len = app.globalData.barList.length;
        t.setData({
            isTuan: app.globalData.isTuan
        })
        if (wx.getStorageSync('openId')){
            app.userInfo(true).then(() => {
                t.setData({
                    userInfo: app.globalData.userInfo
                })
            })
        }
       
        this.getTabBar().setData({
            selected: len==3?2:1,
            list: app.globalData.barList
        })
    }
});