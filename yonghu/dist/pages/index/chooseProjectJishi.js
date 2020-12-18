'use strict';
const app = getApp();
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Page({
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
        chooseProject: [
        ],
        tlsList: [
        ],
        tlsChosedIds: [],
        cIndex: '',
        tabStyle: {
            'width': 'auto'
        },
        activeTabStyle: {
            'color': '#333'
        },
        inkBarStyle: {
            'border-bottom': '1px solid #459E8C',
            'width': '30%'
        },
        imgData: {
            imgSrc1: 'http://images.uileader.com/20180410/6941505a-dc1d-4e76-a88f-d92a0557c3dc.png',
            imgSrc2: 'http://images.uileader.com/20180410/c88b2b34-81e0-4454-97bf-dd6a3d1be8e6.png',
            imgSrc3: 'http://images.uileader.com/20180410/e67961d2-5831-4b23-b51a-11239fae7d91.png',
            imgSrc4: 'http://images.uileader.com/20180410/10dd67ca-a09d-4d77-a190-95889d56091d.png',
            imgSrc5: 'http://images.uileader.com/20180410/f2911a8d-1db9-442a-a29d-a01be7d86b43.png',
            imgSrc6: 'http://images.uileader.com/20180410/d9278f23-a2d1-4bd4-9b0a-19a55a0add54.png',
            imgSrc7: 'http://images.uileader.com/20180410/c4c0047f-467c-4984-9e7f-263b2447f2b5.png',
            imgSrc8: 'http://images.uileader.com/20180410/0490f6ac-eae9-4801-973b-30f5ea0a5d0c.png'
        },
        show: false,
        canLoad: false,
        gradeArr: ['', '1', '11', '111'],
        nearbyStore: [],
        showTishi: false,
        effectiveTechLength: 0,
        waitId: ''
    },
    orderDetail() {
        const t = this;
        let _do = function () {
            app.orderDetail().then((res) => {
                if (!res) {
                    setTimeout(() => {
                        _do()
                    }, 1000)
                    wx.showLoading({
                        title: '加载中'
                    });
                } else {
                    wx.hideLoading();
                    app.globalData.orderDetail = res;
                    wx.navigateTo({
                        url: 'pay',
                    })
                }
            })
        }
        _do()
    },
    onShow(){
        const t = this;
        if (app.globalData.outTradeNo){
            // 下过单的要去掉下单
            // app.removeOrder();
            app.globalData.outTradeNo = '';
            for (const i in t.data.chooseProject) {
                t.selectTechnician(i);
            }
            setTimeout(() => {
                t.setData({
                    canLoad: true
                })
            }, 100)
        }
        if (app.globalData.nearbyStore){
            t.setData({
                nearbyStore: app.globalData.nearbyStore
            })
        }
        setTimeout(()=>{
            t.setData({
                showTishi: true
            })
        }, 1000)
    },
    gotoOtherStore(){
        const t = this;
        let ids = t.data.nearbyStore.map((item)=>{
            return item.id
        })
        let appointTime = app.globalData.chooseStore.appointTime;
        let chooseStore = {};
        let index = ids.indexOf(app.globalData.chooseStore.id);
        if (index >-1){
            chooseStore = t.data.nearbyStore[index + 1] || t.data.nearbyStore[index - 1]
        }else{
            chooseStore = t.data.nearbyStore[0]
        }
        chooseStore.appointTime = appointTime;
        app.globalData.chooseStore = chooseStore;
        t.onLoad();
    },
    onLoad(){
        const t = this;
        t.setData({
            chooseProject: app.globalData.chooseProject
        })
        t.userTechnicians();
        for(const i in t.data.chooseProject){
            t.selectTechnician(i);
        }
        setTimeout(()=>{
            t.setData({
                canLoad: true
            })
        }, 100)
    },
    // 专属调理师
    userTechnicians() {
        const t = this;
        let params = {
            storeId: app.globalData.chooseStore.id,
            userId: app.globalData.userInfo.userId,
            itemId: app.globalData.chooseProject[t.data.cIndex || 0].id,
            times: app.globalData.chooseProject[t.data.cIndex || 0].defaultDuration,
            dateTime: app.globalData.chooseStore.appointTime
            
        }
        app.userTechnicians(params).then((res) => {
            t.setData({
                userTechniciansList: res
            })
        })
    },
    // 技师列表
    selectTechnician(cIndex){
        const t = this;
        let params = {
            storeId: app.globalData.chooseStore.id,
            itemIdsStr: app.globalData.chooseProject[cIndex].id,
            timesStr: app.globalData.chooseProject[cIndex].defaultDuration,
            dateTime: app.globalData.chooseStore.appointTime
        }
        app.selectTechnician(params).then((res)=>{
            res[0].employees.sort(function (a, b) {
                if (a.pricePerMinute > b.pricePerMinute) {
                    return -1;
                } else if (a.pricePerMinute == b.pricePerMinute) {
                    return 0;
                } else {
                    return 1;
                }
            });
            
            t.data.chooseProject[cIndex].technicianList = res[0].employees;
            // 有效能可选技师
            t.data.chooseProject[cIndex].effectiveTechLength = 0;
            // t.setData({
            //     chooseProject: t.data.chooseProject
            // })
            console.log(t.data.chooseProject)
            let needChooseIndex = 0;
            let hasNeedChooseIndex = false;
            for (const i in res[0].employees){
               
                let v = res[0].employees[i];
                
                if (v.waitTime == 0){
                    // 有效可选技师数量
                    t.data.chooseProject[cIndex].effectiveTechLength++;
                }

                // 校验从等待技师点击过来,优先
                if(t.data.waitId){
                    if(t.data.waitId == v.id && !hasNeedChooseIndex){
                        hasNeedChooseIndex = true;
                        t.data.waitId = '';
                        needChooseIndex = i;
                        break;
                    }
                }else{
                    if(t.data.tlsChosedIds.indexOf(v.id) < 0 && v.waitTime == 0 && !hasNeedChooseIndex){
                        hasNeedChooseIndex = true;
                        t.data.waitId = '';
                        needChooseIndex = i;
                        break;
                    }
                }
                // if ((t.data.waitId && t.data.waitId == v.id && !hasNeedChooseIndex) || (t.data.tlsChosedIds.indexOf(v.id) < 0 && v.waitTime == 0 && !hasNeedChooseIndex)){
                //     hasNeedChooseIndex = true;
                //     t.data.waitId = '';
                //     needChooseIndex = i;
                //     break;
                // }
            }
            t.data.cIndex = cIndex;
            let _d = { target: { dataset: { index: needChooseIndex } }, firstLoad: true }
            // 处理默认选中
            // t.chooseTlx(_d);
            // 最后一个循环结束处理handlechange
            if (t.data.chooseProject.length >1 && cIndex == t.data.chooseProject.length-1){
                setTimeout(()=>{
                    t.handleChange({ detail: { index: 0 } })
                }, 100)
                
            }else{
                t.setData({
                    chooseProject: t.data.chooseProject,
                    cIndex: cIndex
                })
            }
        })
    },
    chooseTlx(e){
        const t = this;
        let i = e.target.dataset.index;
        let _do = ()=>{
            if (t.data.chooseProject[t.data.cIndex].technicianList[i].chosed){
                t.data.chooseProject[t.data.cIndex].technicianList[i].chosed = false;
                t.data.tlsChosedIds = t.data.tlsChosedIds.filter((v)=>{
                    return v != t.data.chooseProject[t.data.cIndex].technicianList[i].id
                })
            }else{
                t.data.chooseProject[t.data.cIndex].technicianList[i].chosed = true;
                t.data.tlsChosedIds.push(t.data.chooseProject[t.data.cIndex].technicianList[i].id)
            }
            t.data.chooseProject[t.data.cIndex].technicianChoose = [];
            for (const v of t.data.chooseProject[t.data.cIndex].technicianList){
                if(v.chosed){
                    t.data.chooseProject[t.data.cIndex].technicianChoose.push(v)
                }
            }
            t.setData({
                chooseProject: t.data.chooseProject,
            })
        }
        if( e.firstLoad || t.data.chooseProject[t.data.cIndex].technicianList[i].chosed ){
            _do();
        }else{
            wx.showModal({
                title: '提示',
                content: '是否确认选择技师',
                success (res) {
                  if (res.confirm) {
                    _do();
                  } else if (res.cancel) {
                    
                  }
                }
            })
        }
    },
    waitClick(e){
        const t = this;
        let i = e.target.dataset.index;
        let obj = t.data.chooseProject[t.data.cIndex].technicianList[i];
        let newappointTime = app.formatDate(new Date(app.globalData.chooseStore.appointTime).getTime() + obj.waitTime * 60 * 1000);
        wx.showModal({
            title: '提示',
            content: '您选择的技师需要等待，预约时间为：'+newappointTime+'是否确定选择？',
            success (res) {
                if (res.confirm) {
                    _do();
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
        let _do = ()=>{
            
            app.globalData.chooseStore.appointTime = newappointTime;
            t.data.waitId = obj.id;
            t.onLoad();
        }
    },
    clearTechnician(e){
        const t = this;
        let _index = e.target.dataset.index;
        t.data.chooseProject[t.data.cIndex].technicianChoose.splice(_index, 1);
        t.setData({
            chooseProject: t.data.chooseProject
        })
    },
    submit: function submit() {
        var t = this;
        let msg = ''
        for (const v of t.data.chooseProject){
            if (!v.technicianChoose || (v.technicianChoose && !v.technicianChoose.length)){
                msg = '请选择' + v.itemName+'的调理师'
            }
        }
        if (msg){
            wx.showModal({
                title: '提示',
                content: msg,
            })
            return
        }
        app.globalData.chooseProject = t.data.chooseProject;
        app.order().then((res)=>{
            app.globalData.outTradeNo = res.outTradeNo;
            t.orderDetail();
            
        })
        
        
    },
    onHide: function onHide() {
        var t = this;
        t.setData({
            show: false
        });
    },
    showDetail: function showDetail() {
        var t = this;
        t.setData({
            show: true
        });
    },
    handleChange: function handleChange(e) {
        var t = this;
        var index = e.detail.index;
        if (t.data.cIndex == index){
            return
        }
        t.setData({
            cIndex: index,
        });
        let currTechnicianChooseIds = [];
        if (t.data.chooseProject[t.data.cIndex].technicianChoose && t.data.chooseProject[t.data.cIndex].technicianChoose.length) {
            currTechnicianChooseIds = t.data.chooseProject[t.data.cIndex].technicianChoose.map((v) => { return v.id });
        }
        t.data.chooseProject[t.data.cIndex].technicianList.forEach((v)=>{
            // 当前技师不在已选的技师里面，或者已经存在于选中的技师列表里。返回当前数据
            if (t.data.tlsChosedIds.indexOf(v.id) < 0 || currTechnicianChooseIds.indexOf(v.id) > -1){
                v.hasChoosedByOther = false;
            }else{
                v.hasChoosedByOther = true;
            }
            
        })
        t.data.chooseProject[t.data.cIndex].effectiveTechLength = t.data.chooseProject[t.data.cIndex].technicianList.filter((item) => {
            return !item.hasChoosedByOther && item.waitTime == 0
        }).length;
        t.setData({
            chooseProject: t.data.chooseProject
        })
        // t.selectTechnician();
        // console.log(t.data.chooseProject[t.data.cIndex].technicianList.length , t.data.nearbyStore.length)
    },
    
    sliderchange: function sliderchange(e) {
        var t = this;
        if(!t.data.canLoad){
            return
        }
        if (typeof t.settime != 'undefined'){
            clearTimeout(t.settime);
        }
        t.settime = setTimeout(()=>{
            var defaultDuration = e.detail.value;
            t.data.chooseProject[e.currentTarget.dataset.index].defaultDuration = defaultDuration;
            t.data.cIndex = e.currentTarget.dataset.index;
            t.setData({
                chooseProject: t.data.chooseProject,
                cIndex: t.data.cIndex
            });
            console.log('slider load')
            t.data.tlsChosedIds = [];
            t.selectTechnician(t.data.cIndex);
        }, 500)
    },
    add(e){
        const t = this;
        let value;
        let defaultDuration =  t.data.chooseProject[e.currentTarget.dataset.index].defaultDuration;
        if(defaultDuration + 10 >= t.data.chooseProject[e.currentTarget.dataset.index].maxDuration){
            value = t.data.chooseProject[e.currentTarget.dataset.index].maxDuration;
        }else{
            value = defaultDuration + 10;
        }
        e.detail = {value: value}
        t.sliderchange(e)
    },
    plus(e){
        const t = this;
        let value;
        let defaultDuration =  t.data.chooseProject[e.currentTarget.dataset.index].defaultDuration;
        if(defaultDuration - 10 <= t.data.chooseProject[e.currentTarget.dataset.index].mixDuration){
            value = t.data.chooseProject[e.currentTarget.dataset.index].mixDuration;
        }else{
            value = defaultDuration - 10;
        }
        e.detail = {value: value}
        t.sliderchange(e)
    }
});