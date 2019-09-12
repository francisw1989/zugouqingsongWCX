'use strict';
Object.defineProperty(exports, "__esModule", {
    value: true
});
const app = getApp();
exports.default = Page({
    data: {},
    onShow() {
        this.getTabBar().setData({
            selected: 2,
            list: app.globalData.barList
        })
        
    }
});