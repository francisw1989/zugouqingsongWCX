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
        
    },
    onShow(){
        
    },
    onLoad() {
        const t = this;
        app.userInfo();
        app.itemClass().then((res) => {
            t.setData({
                itemList: app.globalData.itemList
            })
        })
        app.getLoaction().then((res)=>{
            app.index()
        })
        setTimeout(() => {
            // t.setData({
            //     jxzShow: true
            // })
        }, 5000)
    }
});