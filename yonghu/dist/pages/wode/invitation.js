'use strict';
const app = getApp();
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Page({
    data: {},
    onLoad(opt){
        const t = this;
        t.setData({
            assembleId: opt.assembleId
        })
    },
    onShareAppMessage(e) {
        const t = this;
         //p ---pageFrom  id --- assembleId
        return {
            title: '团购分享',
            path: '/pages/index/index?scene=' + app.globalData.assembleId,
            // imageUrl: t.data.shareImg,
            success: (res) => {
                console.log("转发成功", res);
            },
            fail: (res) => {
                console.log("转发失败", res);
            }
        }
    },
});