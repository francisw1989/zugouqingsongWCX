'use strict';
const app = getApp();
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Page({
    data: {
        v:{}
    },
    makePhoneCall(e) {
        wx.makePhoneCall({
            phoneNumber: e.currentTarget.dataset.phonenum //仅为示例，并非真实的电话号码
        })
    },
    onLoad(opt){
        const t = this;
        app.store(opt.id).then((res)=>{
            t.setData({
                v: res
            })
        })
    }
});