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
    onLoad(){
        const t = this;
        let userInfo = app.globalData.userInfo;
        t.setData({
            userInfo: userInfo
        })
    },
    onShow() {
        let len = this.getTabBar().data.list.length;
        this.getTabBar().setData({
            selected: len==3?2:1,
            list: app.globalData.barList
        })
    }
});