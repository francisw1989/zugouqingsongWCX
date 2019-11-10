'use strict';
const app = getApp();
Object.defineProperty(exports, "__esModule", {
    value: true
});
import QRCode from '../../static/utils/weapp-qrcode.js'
exports.default = Page({
    data: {
        // 1.待支付 2.已支付待到店 3.已到店待服务 4.服务中 5.服务完成 6.系统取消 7.用户取消
        tabs: ['待支付', '待到店', '待服务', '服务中', '服务完成', '已取消'],
        current: 0,
        inkBarStyle: {
            'width': '30%'
        },
        list: [],
        numberStyle: {
            color: '#F88A0B'
        },
        page: 1,
        size: 10,
        total: 0,
        ewmShow: false,
        ewmUrl: ''
    },
    handleShowMask1(){
        const t = this;
        t.setData({
            ewmShow: false
        })
    },
    timeUp(e){
        console.log(e)
        const t = this;
        t.data.list[e.currentTarget.dataset.index].showJxzf = false;
        t.setData({
            list: t.data.list
        })
    },
    gotoDetail(e){
        const t = this;
        wx.navigateTo({
            url: 'appointmentDetail?id=' + e.currentTarget.dataset.id,
        })

    },
    pay(e){
        const t = this;
        app.globalData.outTradeNo = e.currentTarget.dataset.outtradeno;
        app.orderDetail().then((res)=>{
            app.globalData.orderDetail = res;
            wx.navigateTo({
                url: '../index/pay?count=' + e.currentTarget.dataset.count,
            })
        })
    },
    removeOrder(e){
        const t = this;
        app.globalData.outTradeNo = e.currentTarget.dataset.outtradeno;
        app.removeOrder().then((res)=>{
          t.setData({
            list: [],
            total: 0
          })
            t.getList();
        })
    },
    handleChange: function handleChange(e) {
        const t = this;
        var index = e.detail.index;
        this.setData({
            current: index,
            page: 1,
            list: []
        });
        t.getList();
    },
    onReachBottom(){
        const t = this
        console.log('bottom')
        t.data.page ++ ;
        t.getList()
    },
    getList(){
        const t = this;
        if(t.data.list.length<t.data.total || t.data.total == 0){
            app.reservations(Number(t.data.current) + 1, t.data.page, t.data.size).then((res) => {
                t.setData({
                    list: [...t.data.list, ...res.records],
                    total: res.total
                })
            })
        }
        
    },
    onShow(){
        const t = this;
        t.setData({
            page: 1,
            list: []
        })
        t.getList();
    },
    showEwm(e){
        const t = this;
        wx.showLoading({
            title: '加载中'
        });
        new QRCode('myQrcode', {
            text: e.target.dataset.outtradeno,
            width: 200,
            height: 200,
            padding: 12, // 生成二维码四周自动留边宽度，不传入默认为0
            correctLevel: QRCode.CorrectLevel.L, // 二维码可辨识度
            callback: (res) => {
                console.log(res.path)
                // 接下来就可以直接调用微信小程序的api保存到本地或者将这张二维码直接画在海报上面去，看各自需求
                wx.hideLoading();
                t.setData({
                    ewmShow: true
                })
            }
        })
    }
});