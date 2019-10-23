'use strict';
const app = getApp();
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Page({
    data: {
        list: [
            
        ],
        inkBarStyle: {
            'width': '30%'
        },
        current: 0
    },
    onShow(){
        const t = this;
        t.setData({
            userInfo: app.globalData.userInfo
        })
    },
    tabclick(e) {
        const t = this;
        var index = e.currentTarget.dataset.index;
        this.setData({
            current: index
        });
        
    },
    onLoad(){
        const t = this
        app.memberLevel({}).then((res)=>{
            t.setData({
                list: res
            })
        })
    }
});