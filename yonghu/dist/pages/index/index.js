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
        D: {},
        O: {}
    },
    chooseProject(e){
        const t = this;
        let index = e.currentTarget.dataset.index;
        let id = e.currentTarget.dataset.id;
        app.globalData.chooseProject = [t.data.D.itemRecommendList[index]];
        app.globalData.appointFromProject = true;
        wx.navigateTo({
            url: 'projectDetail?itemId=' + id,
        })
    },
    chooseStore(e){
        const t = this;
        let index = e.currentTarget.dataset.index;
        let id = e.currentTarget.dataset.id;
        app.globalData.chooseStore = t.data.D.nearbyStore[index];
        app.globalData.appointFromProject = false;
        wx.navigateTo({
            url: 'shopDetail?id='+id,
        })
    },
    onShow() {
        this.getTabBar().setData({
            selected: 0,
            list: app.globalData.barList
        })
        
    },
    newOrder(){
        const t = this;
        let _do = ()=>{
            app.newOrder().then((res) => {
                if (!res.nowOrder){
                    setTimeout(()=>{
                        _do()
                    }, 10000)
                }else{
                    t.setData({
                        jxzShow: true,
                        O: res
                    })
                    t.initGoodsPage();
                }
            });
        }
        
    },
    // 全局加载商品页面
    initGoodsPage(){
        const t = this;
        let list = t.getTabBar().data.list;
        list.splice(1, 0, {
            "selectedIconPath": "/static/images/7.png",
            "iconPath": "/static/images/8.png",
            "pagePath": "/pages/index/goods",
            "text": "商品"
        })
        app.globalData.barList = list;
        t.getTabBar().setData({
            list: list
        })
    },
    getIndex(){
        const t = this;
        app.getLoaction().then((res) => {
            app.index().then((res) => {
                t.setData({
                    D: res
                })
            })
        })
    },
    getItemClass(){
        const t = this;
        app.itemClass().then((res) => {
            t.setData({
                itemClassList: app.globalData.itemClassList
            })
        })
    },
    onLoad() {
        const t = this;
        app.userInfo().then((res)=>{
            t.newOrder();
        });
        t.getIndex();
        t.getItemClass();
        

    }
});