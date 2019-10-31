'use strict';
const app = getApp();
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Page({
    data: {
        menuShow: false,
        choosedRange: 2,
        //1历史2今天3明天
        tabs: [
            {
                id:1,
                text:"历史"
            },
            {
                id:2,
                text:"今天"
            },
            {
                id:3,
                text:"明天"
            },
            {
                id:0,
                text:"全部"
            }
        ],
        status:0,
        page:1,
        size:100,
        //订单状态（1.待支付 2.已支付待到店 3.已到店待服务 4.服务中 5.服务完成 6.系统取消 7.用户取消 ）
        // statusList:["待到店","待到店","待到店","进行中","已完成","取消","取消"],
        // statusList:["待支付","已支付待到店","已到店待服务","进行中","已完成","系统取消","用户取消"],
        statusList:[//切换选择的状态 1.待支付 2.已支付待到店 3.已到店待服务 4.服务中 5.服务完成 6.系统取消 7.用户取消
            {
                key:0,
                value:"全部",
                isShow:true
            },
            {
                key:1,
                value:"待支付",
                isShow:false
            },
            {
                key:2,
                value:"待到店",
                isShow:false
            },
            {
                key:3,
                value:"待服务",
                isShow:true
            },
            {
                key:4,
                value:"服务中",
                isShow:true
            },
            {
                key:5,
                value:"服务完成",
                isShow:true
            },
            {
                key:6,
                value:"系统取消",
                isShow:false
            },
            {
                key:7,
                value:"用户取消",
                isShow:false
            }
        ],
        //订单的状态
        
        inkBarStyle: {
            'width': '30%'
        },
        list: []
    },
    choose(e){
        const t = this;
        console.log(e.target.dataset.key)
        t.setData({
            menuShow: false,
            status:e.target.dataset.key
        })
        t.initData();
    },
    handleChange: function handleChange(e) {
        var index = e.detail.index;
        this.setData({
            tabIndex: index
        });
    },
    //状态为中文显示
    settingStatus: function setting(statusId) {
        const t = this;
        return t.data.statusList[statusId-1]
    },
    onShow() {
        const t = this;
        t.setData({
            userInfo: app.globalData.userInfo
        })
        t.initData();
        
    },
    //获取数据
    initData(){
        const t = this;
        let params = {
                employeeId: app.globalData.userInfo.id,
                range:t.data.choosedRange,//1历史2今天3明天
                page:t.data.page,
                size:t.data.size,
                status:t.data.status//状态 0全部 2 未到店 3已到店 4进行中 5已完成
        }
        
        app.employeeOrder(params).then((res)=>{
            console.log(res);
            //处理数据状态中文显示
            let newRes = res.records.filter((element,index) => {
                t.data.statusList.forEach(item => {
                    if(item.key == element.status){
                        element.statusText = item.value;
                    }
                });
            });
            t.setData({
                list: res.records
            })
        })
        console.log(t.data);
    },
    //切换范围
    chooseRange(e){//1历史2今天3明天   0表示全部
        // console.log(e.currentTarget.dataset);
        const t = this;
        let choosedRange = e.currentTarget.dataset.id;
        // console.log(choosedRange);
        if (choosedRange==0){
            choosedRange = 4
            t.setData({
                menuShow: true
            })
            return
        }
        t.setData({
            choosedRange:choosedRange,
            page:1
        })
        t.initData();

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
       
    },

});