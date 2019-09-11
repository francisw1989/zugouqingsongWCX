'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
const app = getApp()
exports.default = Page({
    data: {
        jxzShow: false,
        lcList: [
            { time: '', content: '预约开始时间：2019-06-11 12:00' }, 
            { time: '', content: '预约时长：50分钟' },
            { time: '', content: '预计结束时间：2019-06-11 12:50' }
        ],
        itemList: [],
        D: {}
    },
    onShow(){
        
    },
    onLoad() {
        const t = this;
        // wx.setTabBarItem({
        //     index: 1,
        //     selectedIconPath: "static/images/7.png",
        //     iconPath: "static/images/8.png",
        //     text: "商品"
        // })
        app.userInfo();
        // wx.hideTabBar();
        app.itemClass().then((res) => {
            t.setData({
                itemList: app.globalData.itemList
            })
        })
        app.getLoaction().then((res)=>{
            app.index().then((res) =>{
                t.setData({
                    D: res
                })
            })
        })
        setTimeout(() => {
            t.setData({
                jxzShow: true
            })
            
        }, 5000)
    }
});