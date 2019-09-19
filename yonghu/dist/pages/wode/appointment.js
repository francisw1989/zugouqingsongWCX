'use strict';
const app = getApp();
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Page({
    data: {
        tabs: ['未支付', '已完成', '已取消'],
        current: 0,
        inkBarStyle: {
            'width': '30%'
        },
        list: [],
        numberStyle: {
            color: '#F88A0B'
        }
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
        app.reservations(t.data.current + 1).then((res)=>{
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