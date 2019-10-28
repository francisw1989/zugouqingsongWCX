'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
const app = getApp();
exports.default = Page({
    data: {
        D: {},
        type: null,
        checkedTypes: [],
        numberStyle: {
            color: '#F88A0B',
            fontSize: '30rpx'
        },
        wxDisable: false,
        wxChecked: false,
        couponName: ''
    },
    bindtimeup(){
        wx.switchTab({
            url: '../index/index'
        })
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
        if (t.data.pageFrom == 'goods'){
            app.articleOrderPay(t.data.type).then((res)=>{
                app.globalData.wxObj = res;
                app.wxPay().then(() => {
                    wx.showModal({
                        title: '提示',
                        content: '支付成功，即将返回首页！',
                        success(res) {
                            if (res.confirm) {
                                wx.switchTab({
                                    url: 'index',
                                })
                            } else if (res.cancel) {
                                console.log('用户点击取消')
                            }
                        }
                    })
                    
                });
            })
        }else{
            app.orderPay(t.data.type).then((res) => {
                if (res.needWxPay == 1) {
                    app.globalData.wxObj = res.data;
                    app.wxPay().then(() => {
                        if (t.data.pageFrom == 'goods') {
                            wx.switchTab({
                                url: 'index',
                            })
                        } else {
                            wx.redirectTo({
                                url: 'paySuccess',
                            })
                        }

                    });
                } else {
                    wx.redirectTo({
                        url: 'paySuccess',
                    })
                }

            })
        }
        
    },
    
    onLoad(opt){
        const t = this;
        app.globalData.chooseCoupon = ''
        t.setData({
            pageFrom: opt.pageFrom,
            D: app.globalData.orderDetail,
            U: app.globalData.userInfo
        })
        if (app.globalData.orderDetail.isCoupon == 1 || app.globalData.orderDetail.isAssemble == 1){
          t.setData({
            couponName: app.globalData.orderDetail.coupon.couponName
          })
        }else{
          t.setData({
            couponName: ''
          })
        }

        if (t.data.U.totalAccount < t.data.D.totalPrice) {
            t.setData({
                checkedTypes: ['2'],
                wxDisable: true,
                wxChecked: true,
                type: 2
            })
        }
    },
    onShow(){
        const t = this;
        if (app.globalData.chooseCoupon){
            t.setData({
                couponName: app.globalData.chooseCoupon.couponName,
            })
            app.checkPrice().then(()=>{
                t.setData({
                    D: app.globalData.orderDetail
                })
            })
            
        }
    },
    //取消优惠券
    cancelCoupon(){
      const t = this;
      app.cancelCoupon().then(() => {
        console.log(app.globalData.orderDetail);
        t.setData({
          D: app.globalData.orderDetail
        });
        if (app.globalData.orderDetail.isCoupon == 1 || app.globalData.orderDetail.isAssemble == 1) {
          t.setData({
            couponName: app.globalData.orderDetail.coupon.couponName
          })
        } else {
          t.setData({
            couponName: ''
          })
        }
      });
      
    }
});