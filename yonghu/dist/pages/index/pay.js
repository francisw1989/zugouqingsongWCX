'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
const app = getApp();
exports.default = Page({
    data: {
        D: {},
        type: null,
        checkedTypes: []
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
        console.log(e.detail.value);
        const t = this;
        let type;
        if (e.detail.value.length == 1){
            type = e.detail.value[0]
        } else if (e.detail.value.length == 2){
            type = 0
        }
        t.setData({
            type: type
        })
    },
    orderPay(){
        const t = this;
        if (!t.data.type && t.data.type!=0){
            wx.showModal({
                title: '提示',
                content: '请选择支付方式',
            })
            return
        }
        app.orderPay(t.data.type).then((res)=>{
            if (res.needWxPay == 1){
                app.globalData.wxObj = res.data;
                app.wxPay().then(()=>{
                    if (t.data.pageFrom == 'goods'){
                        wx.switchTab({
                            url: 'index',
                        })
                    }else{
                        wx.redirectTo({
                            url: 'paySuccess',
                        })
                    }
                    
                });
            }else{
                wx.redirectTo({
                    url: 'paySuccess',
                })
            }
            
        })
    },
    
    onLoad(opt){
        const t = this;
        t.setData({
            pageFrom: opt.pageFrom,
            D: app.globalData.orderDetail,
            U: app.globalData.userInfo
        })
    }

    
});