'use strict';
const app = getApp();;
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Page({
    data: {},
    go(e){
        const t = this;
        let index = e.currentTarget.dataset.index;
        let id = e.currentTarget.dataset.id;
        if(t.data.pageFrom == 'index'){
            wx.navigateTo({
                url: 'shopDetail?id=' + id,
            })
        } else if (t.data.pageFrom == 'projectDetail'){
            app.globalData.chooseStore = t.data.list[index];
            wx.navigateTo({
                url: 'appointmentTime',
            })
        }
    },
    onLoad(opt) {
        const t = this;
        t.setData({
            pageFrom: opt.pageFrom
        })
        app.stores().then((res)=>{
            t.setData({
                list: res
            })
        })
    },
});