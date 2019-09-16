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
        itemClassList: [],
        D: {}
    },
    onShow() {
        this.getTabBar().setData({
            selected: 0,
            list: app.globalData.barList
        })
        
    },
    onLoad() {
        const t = this;
        setTimeout(() => {
            let list = this.getTabBar().data.list;
            list.splice(1, 0, {
                "selectedIconPath": "/static/images/7.png",
                "iconPath": "/static/images/8.png",
                "pagePath": "/pages/index/goods",
                "text": "商品"
            })
            
            app.globalData.barList = list;
            this.getTabBar().setData({
                list: list
            })
        }, 6000)
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
                itemClassList: app.globalData.itemClassList
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