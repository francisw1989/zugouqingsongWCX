'use strict';
const app = getApp();
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Page({
    data: {
        tags: ['安静', '安静', '安静', '安静', '安静'],
        list: [{ showMore: false }, { showMore: false }],
        lcList: [{ time: '', content: '今天09:20   服务完成' }, { time: '', content: '今天09:00   到店后开始服务' }, { time: '', content: '昨天09:20   预约' }]
    },
    showMore: function showMore(e) {
        var t = this;
        var _showMore = t.data.list[e.currentTarget.dataset.index].showMore;
        t.data.list[e.currentTarget.dataset.index].showMore = _showMore ? false : true;
        t.setData({
            list: t.data.list
        });
    },
    initData(){
        const t = this;
        let params = {
            orderId: t.data.orderId
        }
        app.orderInfo(params).then((res)=>{
            // console.log(res);
            t.setData({
                detail: res
            })
        })
        console.log(t.data);
    },
    //给用户打标签
    addTag(e){
        var t = this;
        wx.navigateTo({
            url: 'tag?userId=' + e.currentTarget.dataset.userid + "&employeeId="+app.globalData.userInfo.userId+"&orderId="+e.currentTarget.dataset.orderid+"&orderItemId="+e.currentTarget.dataset.orderitemid
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
        const t = this;
        t.setData({
            orderId:options.orderId
        })
        t.initData();
        
    },
});