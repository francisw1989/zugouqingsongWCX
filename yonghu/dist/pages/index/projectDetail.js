'use strict';
const app = getApp();
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Page({
    data: {
        I: {},
        list: []
    },
    onLoad(opt) {
        const t = this;
        t.setData({
            itemId: opt.itemId
        })
        app.getItem(t.data.itemId).then((res)=>{
            t.setData({
                D: res
            })
        })
        app.assembleRecord(t.data.itemId).then((res)=>{
            t.setData({
                list: res
            })
        })
    }
});