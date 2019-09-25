'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
const app = getApp();
exports.default = Page({
    data: {
        list: [],
        totalMouny: 0,
        totalNum: 0, 
        current: 0,
        tabStyle: {
            'color': '#333',
            'width:': '60px'
        },
        activeTabStyle: {},
        tabItems: [{ name: '全部'}],
        height: wx.DEFAULT_CONTENT_HEIGHT,
        customStyle: {
            'background-color': '#f71429',
            'border': '2px solid #fff'
        }

    },
    plusAdd(e){
        const t = this;
        let i = e.currentTarget.dataset.index;
        t.data.list[i].num = e.detail;
        let totalMouny = 0;
        let totalNum = 0;
        for(const v of t.data.list){
            totalNum += Number(v.num);
            totalMouny += (v.num * v.salesPrice);
        }
        t.setData({
            totalMouny: totalMouny/100,
            totalNum: totalNum
        })
        
    },
    orderGoods(){
        const t = this;
        let chooseGoods = [];
        for(const v of t.data.list){
            if(v.num>0){
                chooseGoods.push(v)
            }
        }
        if (chooseGoods.length==0){
            wx.showModal({
                title: '提示',
                content: '请选择商品',
            })
            return
        }
        app.globalData.chooseGoods = chooseGoods;
        app.orderGoods().then((res)=>{
            app.globalData.orderDetail = res;
            app.globalData.outTradeNo = res.outTradeNo;
            wx.navigateTo({
                url: 'pay?pageFrom=goods',
            })
        });
    },
    handleChange: function handleChange(e) {
        console.log(e);
        var index = e.detail.index;
        this.setData({
            current: index
        });
    },
    onShow() {
        this.getTabBar().setData({
            selected: 1,
            list: app.globalData.barList
        })

    },
    goods(){
        const t = this;
        app.goods().then((res)=>{
            for(const v of res){
                v.num = 0
            }
            t.setData({
                list: res
            })
        });
    },
    setSize(){
        const t = this;
        var query = wx.createSelectorQuery();
        query.select('#seachWap2').boundingClientRect();
        query.exec(function (res) {
            //res就是 所有标签为mjltest的元素的信息 的数组
            console.log(res);
            //取高度
            t.setData({
                height: t.data.height - res[0].height - 120
            });
            console.log(t.data.height);
        });
    },
    onLoad: function onLoad() {
        var t = this;
        t.setSize();
        t.goods();
        
    }
});