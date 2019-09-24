'use strict';
const app = getApp();
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Page({
    data: {
        I: {},
        list: [],
        statusName: ['待开团（待支付）', '进行中', '已完成', '已失败']
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
    },
    joinGroup(e){
        wx.setStorageSync('assembleId', e.target.dataset.id)
        wx.navigateTo({
            url: '../wode/groupSuccess?pageFrom=projectDetail',
        })
    }
});