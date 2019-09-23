'use strict';
const app = getApp();
Object.defineProperty(exports, "__esModule", {
    value: true
});
/*
拼团过程不涉及选择技师
拼团成功 只发放优惠券
优惠券只抵扣一个技师
*/ 
exports.default = Page({
    data: {
        D: {},
        peopleNum: [3, 5, 10],
        pIndex: 0,
        price: [],
    },
    createGroup(){
        const t = this;
        app.globalData.chooseProject = [t.data.D];
        app.createGroup().then((res)=>{
            app.globalData.wxObj = res;
            app.wxPay().then(()=>{
                wx.redirectTo({
                    url: 'groupSuccess?pageFrom=group',
                })
            });
            // wx.redirectTo({
            //     url: '../index/pay?pageFrom=group',
            // })
        })
    },
    changePeopleNum(e){
        const t = this;
        let i = e.target.dataset.index;
        t.data.D.choosePrice = t.data.price[i]
        t.setData({
            pIndex: i
        })
    },
    onLoad(opt){
        const t = this;
        t.setData({
            D: app.globalData.chooseProject[0],
            pageFrom: opt.pageFrom
        })
        t.setData({
            price: [t.data.D.threePrice, t.data.D.fivePrice, t.data.D.tenPrice]
        })
    }
});