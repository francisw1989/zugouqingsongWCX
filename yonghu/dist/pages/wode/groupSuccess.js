'use strict';
const app = getApp();
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Page({
    data: {
        D: {},
        numberStyle: {
            backgroundColor: 'rgba(69,158,140,0.43)',
            color: '#F88A0B',
            borderRadius: '4px',
            fontSize: '12px',
            minWidth: '25px',
            display: 'inline-block',
            textAlign: 'center',
            lineHeight: '20px'
        }
    },
    pageFromShare(){
        if (opt.scene) {
            let scene = decodeURIComponent(opt.scene);
            wx.showModal({
                title: '',
                content: scene,
            })
            wx.setStorageSync('assembleId', scene);
            t.setData({
                assembleId: scene,
                pageFrom: 'share'
            })
        }
    },
    onLoad(opt) {
        const t = this;
        t.pageFromShare();
        t.setData({
            D: app.globalData.chooseProject[0],
            pageFrom: opt.pageFrom
        })
    },
    joinGroup(){
        app.joinGroup().then((res)=>{
            wx.reLaunch({
                url: '../index/index',
            })
        });
    }
});