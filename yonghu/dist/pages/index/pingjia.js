// pages/index/pingjia.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tbObj1: {
            'position': 'absolute',
            'width': '14px',
            'height': '14px',
            'background-color': '#459E8C',
            'border': '0',
            'border-radius': '7px',
            'top': '7px',
            'left': '15px',
            'z-index': '2',
            'box-shadow': '0px 0px 0px'
        },
        tbdObj2: {
            'background-color': '#2ac1a2'
        },
        evaluateScore: 3,
        tab1:['不会','可能','会'],
        tab1Index: 1,
        
        tab2: [
            { name: '环境好', value: '环境好', checked: 'true'},
            { name: '服务好', value: '服务好' },
            { name: '姑娘美', value: '姑娘美' },
            { name: '服务周到', value: '服务周到' },
        ],
        tab2Index: [],
        evaluationList: [{ evaluateScore: 1 }, { evaluateScore: 2 }, { evaluateScore: 3 }, { evaluateScore: 4 }, { evaluateScore: 5}]
    },
    chooseJs(e){
        const t = this;
        let choosed = t.data.nowOrder.orderTechnicians[t.currentTarget.dataset.index].choosed;
        t.data.nowOrder.orderTechnicians[t.currentTarget.dataset.index].choosed = choosed?false:true;
        t.setData({
            nowOrder: t.data.nowOrder
        })
    },
    oninput(e){
        const t = this;
        t.setData({
            content: e.detail.value
        })
    },
    evaluation(){
        const t = this;
        
        let params = {
            evaluateScore: t.data.evaluateScore,
            content: t.data.content,
            orderId:t.data.nowOrder.id
        }
        if (params.evaluateScore == 1){
            let employeeIds = [];
            if (t.data.nowOrder.orderTechnicians){
                for (const v of t.data.nowOrder.orderTechnicians) {
                    if (v.choosed) {
                        employeeIds.push(v.id)
                    }
                }    
            }
            params.employeeIds = employeeIds;
        }
        params.evaluateLabel = t.data.evaluateLabel
        app.evaluation(params).then((res)=>{
            wx.showToast({
                icon: 'none',
                title: '感谢评价',
            })
            setTimeout(()=>{
                wx.navigateBack({

                })
            }, 2000)
        })
    },
    tab1click(e){
        const t = this;
        let v = e.target.dataset.index;
        let evaluateScore;
        if(v==0){
            evaluateScore = 1;
        } else if (v == 1) {
            evaluateScore = 3;
        } else if (v == 2) {
            evaluateScore = 5;
        }
        t.setData({
            evaluateScore: evaluateScore,
            tab1Index: v
        })
    },
    sliderchange(e){
        const t = this;
        console.log(e.detail.value)
        let evaluateScore = e.detail.value;
        let tab1Index;
        if (evaluateScore==1) {
            tab1Index = 0;
        } else if (evaluateScore == 2 || evaluateScore == 3 || evaluateScore == 4) {
            tab1Index = 1;
        } else if (evaluateScore == 5) {
            tab1Index = 2;
        }
        t.setData({
            evaluateScore: evaluateScore,
            tab1Index: tab1Index
        })
    },
    checkboxChange: function (e) {
        console.log('checkbox发生change事件，携带value值为：', e.detail.value)
        const t = this;
        t.setData({
            evaluateLabel: e.detail.value.join(',')
        })
    },
    evaluations() {
        const t = this;
        app.evaluations().then((res) => {
            t.data.evaluationList.forEach((v, i)=>{
                let item = res.filter((val)=>{
                    return val.evaluateScore == v.evaluateScore
                })
                if(!item.length){
                    item = [t.data.evaluationList[i-1]]
                }
                v.evaluateLabel = item[0].evaluateLabel

            })
            t.data.evaluationList.forEach((v)=>{
                v.evaluateLabel = v.evaluateLabel.split(',')
            })
            t.setData({
                evaluationList: t.data.evaluationList
            })
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    
    onLoad: function (options) {
        const t = this;
        t.evaluations();
        t.setData({
            nowOrder: app.globalData.nowOrder
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})