'use strict';
const app = getApp();
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Page({
    data: {
        userInfo: {},
        memberLevelNameList: ['普通会员','一星会员','二星会员','三星会员']
    },
    onLoad(){
        const t = this;
        let userInfo = app.globalData.userInfo;
        t.setData({
            userInfo: userInfo
        })
    }
});