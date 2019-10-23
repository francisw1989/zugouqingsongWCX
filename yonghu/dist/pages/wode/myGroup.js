'use strict';
const app = getApp()
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Page({
    data: {
        list: [{}, {}, {}],
        statusName: ['待开团（待支付）', '进行中',  '已完成', '已失败']
    },
    gotoDetail(e){
        let id = e.currentTarget.dataset.id;
        let index = e.currentTarget.dataset.index;
        wx.setStorageSync('assembleId', id);
        wx.navigateTo({
            url: 'groupSuccess?pageFrom=myGroupList',
        })
    },
    goShare(e){
        const t = this;
        let id = e.currentTarget.dataset.id;
        let index = e.currentTarget.dataset.index;
        wx.setStorageSync('assembleId', id)
        wx.setStorageSync('shareImg', t.data.list[index].item.imgs)
        wx.navigateTo({
            url: 'invitation?pageFrom=group',
        })
    },
    assembleRecordByUser(){
        const t = this;
        app.assembleRecordByUser().then((res)=>{
            t.setData({
                list: res.records
            })
        });
    },
    
    
    onShow(){
        const t = this;
        t.assembleRecordByUser();
    }
});