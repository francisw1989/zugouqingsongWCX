'use strict';
const app = getApp();
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Page({
    data: {
        value1: 452,
        value2: 5,
        memberLevelName: app.globalData.memberLevelName,
        thumbStyle: {
            'width': '18px',
            'height': '18px',
            'border-radius': '9px',
            'background-color': '#B99063',
            'top': '6px'

        }
    },
    onShow(){
        const t = this;
        app.userInfo();
        t.setData({
            userInfo: app.globalData.userInfo
        })
    }
});