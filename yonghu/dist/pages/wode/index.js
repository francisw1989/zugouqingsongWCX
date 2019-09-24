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
    onShow(){
        const t = this;
    },
    onShow() {
        const t = this;
        let len = app.globalData.barList.length;
        app.userInfo().then(()=>{
            t.setData({
                userInfo: app.globalData.userInfo
            })
        })
        this.getTabBar().setData({
            selected: len==3?2:1,
            list: app.globalData.barList
        })
    }
});