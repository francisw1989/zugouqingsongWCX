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
        // app.globalData.appointFromProject = false;
        app.globalData.chooseStore = t.data.list[index];
        if(t.data.pageFrom == 'index'){
            wx.navigateTo({
                url: 'shopDetail?id=' + id,
            })
        } else if (t.data.pageFrom == 'projectDetail'){
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
    makePhoneCall(e) {
        wx.makePhoneCall({
            phoneNumber: e.currentTarget.dataset.phonenum //仅为示例，并非真实的电话号码
        })
    },
});