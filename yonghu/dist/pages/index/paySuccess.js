'use strict';
const app = getApp();
Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = Page({
	data: {
		jsChecked: true,
        leveList:[
            {
                name: '普通会员',
                img: '../../static/images/42.png'
            },
            {
                name: '一星会员',
                img: '../../static/images/43.png'
            },
            {
                name: '二星会员',
                img: '../../static/images/44.png'
            },
            {
                name: '三星会员',
                img: '../../static/images/45.png'
            },
        ]
	},
    checkboxChange: function (e) {
        const t = this;
        t.setData({
            jsChecked: t.data.jsChecked?false: true
        })
    },
    gotoProject(){
        app.globalData.appointFromProject = true;
        wx.reLaunch({
            url: '../index/index'
        })
    },
    onLoad(){
        const t = this;
        app.orderDetail().then((res)=>{
            app.globalData.orderDetail = res;
            t.setData({
                D: res
            })
        })
    },
    finish(){
        const t = this;
        if (!t.data.jsChecked){
            app.isSms(t.data.D.id).then((res)=>{
                wx.switchTab({
                    url: '../index/index'
                })
            })
        }else{
            wx.switchTab({
                url: '../index/index'
            })
        }
    }
});