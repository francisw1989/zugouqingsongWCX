'use strict';
const app = getApp();
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Page({
    data: {
        // 1.待支付 2.已支付待到店 3.已到店待服务 4.服务中 5.服务完成 6.系统取消 7.用户取消
        tabs: ['待支付', '已支付待到店', '已到店待服务', '服务中', '服务完成', '系统取消', '用户取消'],
        current: 0,
        inkBarStyle: {
            'width': '30%'
        },
        list: [],
        numberStyle: {
            color: '#F88A0B'
        }
    },
    pay(){
        const t = this;
        app.globalData.outTradeNo = e.target.dataset.outtradeno;
        app.orderDetail(res).then((res)=>{
            app.globalData.orderDetail = res;
            wx.navigateTo({
                url: '../pay/pay',
            })
        })
    },
    removeOrder(e){
        const t = this;
        app.globalData.outTradeNo = e.target.dataset.outtradeno;
        app.removeOrder().then((res)=>{
            t.getList();
        })
    },
    handleChange: function handleChange(e) {
        const t = this;
        var index = e.detail.index;
        this.setData({
            current: index
        });
        t.getList();
    },
    getList(){
        const t = this;
        app.reservations(Number(t.data.current) + 1).then((res)=>{
            t.setData({
                list: res.records
            })
        })
    },
    onShow(){
        const t = this;
        t.getList();
    }
});