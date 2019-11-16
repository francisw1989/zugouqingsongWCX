'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
const app = getApp();
exports.default = Page({
    data: {
        D: {},
        type: null,
        numberStyle: {
            color: '#F88A0B',
            fontSize: '30rpx'
        },
        wxDisable: false,
        wxChecked: false,
        yeChecked: false,
        couponName: '',
        userInfo: {}
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
        // 1.余额为0时，只能选择微信支付    
        // 2.余额 > 0且小于订单总价时，选择账户支付 同时必须选择微信支付   
        // 3.余额 >= 订单总价时  选择了余额支付  则不可以选择微信支付。

        // 余额足
        if (t.data.U.totalAccount >= t.data.D.totalPrice){
            if (e.detail.value[e.detail.value.length - 1] == 1) {
                t.setData({
                    wxChecked: false,
                    yeChecked: true
                })
            } else if (e.detail.value[e.detail.value.length - 1] == 2) {
                t.setData({
                    wxChecked: true,
                    yeChecked: false
                })
            }
        }else{
            // 余额不足
            t.setData({
                wxChecked: true
            })
        }
    },
    orderPay(){
        const t = this;
      console.log(t.data.wxChecked);
      if (!t.data.wxChecked && !t.data.yeChecked) {
            wx.showModal({
                title: '提示',
                content: '请选择支付方式',
            })
            return
        }
      if (t.data.wxChecked && t.data.yeChecked) {
            t.setData({
                type: 0
            })
        }else{
        if (t.data.yeChecked) {
                t.setData({
                    type: 1
                })
            }
        if (t.data.wxChecked){
                t.setData({
                    type: 2
                })
            }
            
        }
        if (t.data.pageFrom == 'goods'){
            app.articleOrderPay(t.data.type).then((res)=>{
                app.globalData.wxObj = res;
              if (res=='' || res == null || res.needWxPay == 0) {
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
              }
              if (res!='' && res!=null && res.appId!=null) {
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
              }
                
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
        // 1.余额为0时，只能选择微信支付    
        // 2.余额 > 0且小于订单总价时，选择账户支付 同时必须选择微信支付   
        // 3.余额 >= 订单总价时  选择了余额支付  则不可以选择微信支付。
        app.globalData.chooseCoupon = ''

        // app.globalData.userInfo.totalAccount = 300;
        // app.globalData.orderDetail.totalPrice = 200;
        t.setData({
            pageFrom: opt.pageFrom,
            D: app.globalData.orderDetail,
            count: opt.count
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

        // if (t.data.U.totalAccount < t.data.D.totalPrice) {
        //     t.setData({
        //         wxChecked: true,
        //         type: 2
        //     })
        // }
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
        if (wx.getStorageSync('openId')) {
            app.userInfo(true).then(() => {
                t.setData({
                    userInfo: app.globalData.userInfo
                })
            })
        }
    },
    //取消优惠券
    cancelCoupon(){
      const t = this;
      app.globalData.chooseCoupon = null;
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