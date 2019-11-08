'use strict';
const app = getApp();
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Page({
    data: {
        I: {},
        list: [],
        statusName: ['待开团', '进行中', '已完成', '已失败'],
        evaluateList: [],
        pageSize: 10,
        pageNumber: 1,
        total: 0,
        isTuan: 1
    },
    itemEvaluateList(){
        const t = this;
        app.itemEvaluateList({
            itemId: t.data.itemId,
            pageSize: t.data.pageSize,
            pageNumber: t.data.pageNumber,
            userId: app.globalData.userInfo.userId
        }).then((res) => {
            for (const v of res.records){
                v.evaluateLabel && (v.evaluateLabel = v.evaluateLabel.split(','))
            }
            t.setData({
                evaluateList: [...t.data.evaluateList, ...res.records],
                total: res.total
            })
        })
    },
    onLoad(opt) {
        const t = this;
        t.setData({
            itemId: opt.itemId,
            isTuan: app.globalData.isTuan
        })
        app.getItem(t.data.itemId).then((res)=>{
            t.setData({
                D: res
            })
        })
        app.assembleRecord(t.data.itemId).then((res)=>{
            t.setData({
                list: res
            })
        })
        t.itemEvaluateList();

        
    },
    onReachBottom(){
        const t = this;
        if (t.data.evaluateList.length<t.data.total){
            t.data.pageNumber++;
            t.itemEvaluateList();
        }
        
    },
    joinGroup(e){
        wx.setStorageSync('assembleId', e.target.dataset.id)
        wx.navigateTo({
            url: '../wode/groupSuccess?pageFrom=projectDetail',
        })
    },
    ljyy(){
        app.globalData.appointFromProject = true
        wx.navigateTo({
            url: 'shopList?pageFrom=projectDetail',
        })
    }
});