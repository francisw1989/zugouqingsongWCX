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
        },
        leftMember: []
    },
    pageFromDeal(opt){
        const t = this;
        if (opt.scene) {
            // page from share
            let scene = decodeURIComponent(opt.scene);
            // wx.showModal({
            //     title: '',
            //     content: scene,
            // })
            wx.setStorageSync('assembleId', scene);
            t.setData({
                pageFrom: 'share'
            })
        }else{
            // page form creat group
            if(opt.pageFrom){
                t.setData({
                    pageFrom: opt.pageFrom
                })
            }
        }
        app.assembleRecordInfo().then((res) => {
            res.item.imgs = res.item.imgs.split(',')[0];
            wx.setStorageSync('shareImg', res.item.imgs)
            let len = res.assemblePeople - res.members.length;
            for(let i = 0; i< len; i++){
                t.data.leftMember.push('')
            }
            t.setData({
                D: res,
                leftMember: t.data.leftMember
            })
        });
    },
    onLoad(opt) {
        const t = this;
        t.pageFromDeal(opt);
       
    },
    joinGroup(){
        app.userInfo().then(()=>{
            app.joinGroup().then((res) => {
                wx.reLaunch({
                    url: '../index/index',
                })
            });
        })
        
    }
});