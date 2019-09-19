'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
const app = getApp();
exports.default = Page({
    data: {
        D: {}
    },
    showMore: function showMore(e) {
        var t = this;
        var _showMore = t.data.D.orderItems[e.currentTarget.dataset.index].showMore;
        t.data.D.orderItems[e.currentTarget.dataset.index].showMore = _showMore ? false : true;
        t.setData({
            D: t.data.D
        });
    },
    radioChange: function (e) {
        console.log(e.detail.value)
    },
    orderPay(){
        app.orderPay(t.data.couponRecordId, t.data.type).then((res)=>{
            app.globalData.wxObj = res;
            app.wxPay();
        })
    },
    
    onLoad(opt){
        const t = this;
        t.setData({
            pageFrom: opt.pageFrom,
            D: app.globalData.orderDetail
        })
    }

    
});