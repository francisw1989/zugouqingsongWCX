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
        tlsChosed: [],
        cIndex: 0,
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
        canLoad: false
    },
    onLoad(){
        const t = this;
        t.setData({
            chooseProject: app.globalData.chooseProject
        })
        t.userTechnicians();
        t.selectTechnician();
        setTimeout(()=>{
            t.setData({
                canLoad: true
            })
        }, 100)
    },
    // 专属调理师
    userTechnicians() {
        const t = this;
        let itemId = app.globalData.chooseProject[0].id;
        
        app.userTechnicians(itemId).then((res) => {
            t.setData({
                userTechniciansList: res
            })
        })
    },
    // 技师列表
    selectTechnician(){
        const t = this;
        let params = {
            storeId: app.globalData.chooseStore.id,
            itemIdsStr: app.globalData.chooseProject[t.data.cIndex].id,
            timesStr: app.globalData.chooseProject[t.data.cIndex].defaultDuration,
            dateTime: app.globalData.chooseStore.appointTime
        }
        app.selectTechnician(params).then((res)=>{
            t.data.chooseProject[t.data.cIndex].technicianList = res[0].employees;
            t.setData({
                chooseProject: t.data.chooseProject
            })
        })
    },
    chooseTlx(e){
        const t = this;
        let i = e.currentTarget.dataset.index;
        t.data.chooseProject[t.data.cIndex].technicianList;
        if (t.data.chooseProject[t.data.cIndex].technicianList[i].chosed){
            t.data.chooseProject[t.data.cIndex].technicianList[i].chosed = false;
            
        }else{
            t.data.chooseProject[t.data.cIndex].technicianList[i].chosed = true;
            
        }
        t.data.chooseProject[t.data.cIndex].technicianChoose = [];
        for (const v of t.data.chooseProject[t.data.cIndex].technicianLis){
            if(v.chosed){
                t.data.chooseProject[t.data.cIndex].technicianChoose.push(v)
            }
        }
        t.setData({
            chooseProject: t.data.chooseProject,
        })
    },
    submit: function submit() {
        var t = this;
        console.log('21');
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
        wx.redirectTo({
            url: 'pay',
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
        t.setData({
            cIndex: index,
        });
        console.log('tab load')
        console.log(t.data.cIndex)
        t.selectTechnician();
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
            t.selectTechnician();
        }, 500)

        
    }
});