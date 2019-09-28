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
        O: {},
        statusName: ['', '待支付', '已支付待到店', '已到店待服务', '服务中', '服务完成', '系统取消', '用户取消']
    },
    goProjectsList(e){
        let id = e.currentTarget.dataset.id;
        app.globalData.appointFromProject = true;
        wx.navigateTo({
            url: 'projectsList?id=' + id + '&pageFrom=index',
        })
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
    moreStore(){
        app.globalData.appointFromProject = false;
        wx.navigateTo({
            url: 'shopList?pageFrom=index',
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
        
        
    },
    makePhoneCall(e){
        wx.makePhoneCall({
            phoneNumber: e.currentTarget.dataset.phonenum //仅为示例，并非真实的电话号码
        })
    },
   
    nowOrder(){
        const t = this;

        let _do = ()=>{
            app.nowOrder().then((res) => {
                if (!res.nowOrder){
                    setTimeout(()=>{
                        _do()
                    }, 10*60*1000)
                }else{
                    t.setData({
                        jxzShow: true,
                        O: res.nowOrder
                    })
                    t.initGoodsPage();
                }
            });
        }
        _do()
    },
    // 全局加载商品页面
    initGoodsPage(){
        const t = this;
        let list = t.getTabBar().data.list;
        if(list.length==3){
            return
        }
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
    bannerGo(e){
        const t = this;
        let obj = t.data.D.banners[e.target.dataset.index];
        let type = obj.type
        // 类别（1 门店, 2项目, 3技师, 4链接 5.无链接
        if(type==1){
            wx.navigateTo({
                url: 'shopDetail?id=' + obj.resourceId,
            })
            app.globalData.appointFromProject = false;
        }
        if (type == 2) {
            wx.navigateTo({
                url: 'projectDetail?itemId=' + obj.resourceId,
            })
            app.globalData.appointFromProject = true;
        }
        if (type == 3) {
            wx.navigateTo({
                url: 'technician?id=' + obj.resourceId,
            })
            app.globalData.appointFromProject = false;
        }
        if (type == 4) {
            wx.navigateTo({
                url: 'pageView?src=' + obj.url,
            })
            app.globalData.appointFromProject = false;
        }
        if (type == 5) {
            // wx.navigateTo({
            //     url: 'technician?id=' + obj.resourceId,
            // })
            app.globalData.appointFromProject = false;
        }
    },
    getItemClass(){
        const t = this;
        app.itemClass().then((res) => {
            t.setData({
                itemClassList: app.globalData.itemClassList
            })
        })
    },
    onShow(){
        const t = this;
        // this.getTabBar().setData({
        //     selected: 0,
        //     list: app.globalData.barList
        // })
        if (wx.getStorageSync('openId')) {
            t.nowOrder();
        }
    },
    onLoad(opt) {
        const t = this;
        
        t.getIndex();
        t.getItemClass();
    }
});