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
        leftMember: [],
        hasjoined: false,
        opt: {},
        statusName: ['待开团（待支付）', '进行中', '已完成', '已失败']
    },
    pageFromDeal(){
        const t = this;
        let opt = t.data.opt;
        if (opt && opt.scene) {
            // page from share
            let scene = decodeURIComponent(opt.scene).split(',');
            // wx.showModal({
            //     title: '',
            //     content: scene,
            // })
            wx.setStorageSync('assembleId', scene[0]);
            wx.setStorageSync('friendUserId', scene[1]);
            t.setData({
                pageFrom: 'share'
            })
        }else{
            // page form creat group
            if (opt && opt.pageFrom){
                t.setData({
                    pageFrom: opt.pageFrom
                })
            }
        }
        app.assembleRecordInfo().then((res) => {
            res.item.imgs = res.item.imgs.split(',')[0];
            wx.setStorageSync('shareImg', res.item.imgs)
            let len = res.assemblePeople - res.members.length;
            t.data.leftMember = [];
            for(let i = 0; i< len; i++){
                t.data.leftMember.push('')
            }
            let ids = res.members.map((item)=>{
                return item.id
            })
            if (ids.indexOf(app.globalData.userInfo.userId)>-1){
                t.data.hasjoined = true
            }
            t.setData({
                D: res,
                leftMember: t.data.leftMember,
                hasjoined: t.data.hasjoined
            })
        });
    },
    onLoad(opt){
        const t = this;
        t.setData({
            opt: opt
        })
    },
    onShow() {
        const t = this;
        t.pageFromDeal();
       
    },
    joinGroup(){
        app.joinGroup().then((res) => {
            app.wxPay().then(() => {
                wx.showModal({
                    title: '提示',
                    content: '参团成功',
                })
                wx.switchTab({
                    url: '../index/index',
                })
            })
        });

        
    }
});