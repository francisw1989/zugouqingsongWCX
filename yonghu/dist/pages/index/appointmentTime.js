'use strict';
const app = getApp();
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Page({
    data: {
        time: '',
        cIndex: '-1',
        hours: [],
        mins: [],
        HH: '',
        MM: '',
        date: '',
        dates: [],
    },
    chose: function chose(e) {
        console.log('323');
        var t = this;
        t.setData({
            cIndex: e.target.dataset.index,
            date: t.data.dates[e.target.dataset.index]
        });
    },
    cal(){
        const t = this;
        t.data.hours = [];
        t.data.mins = [];
        // openStartTime openEndTime
        const OS = t.data.I.openStartTime.split(':');
        const OE = t.data.I.openEndTime.split(':');
        let minHour = OS[0];
        let maxHovur;
        // 处理凌晨时间
        if(OS[0] >= OE[0]){
            maxHovur = 24;
        }else{
            maxHovur = Number(OE[0]) + 1
        }
        for (let i = minHour; i < maxHovur; i++) {
            let h = i < 10 ? '0' + Number(i) : i
            t.data.hours.push(h)
        }
        // 处理凌晨时间
        if(OS[0] >= OE[0]){
            for (let i = 0; i <= Number(OE[0]); i++) {
                let h = i < 10 ? '0' + Number(i) : i
                t.data.hours.push(h)
            }
        }
        for (let i = 0; i < 60; i++) {
            t.data.mins.push(i < 10 ? '0' + Number(i) : i)
        }
        t.data.oMins = t.data.mins;
        t.setData({
            hours: t.data.hours,
            mins: t.data.mins,
            time: t.data.hours[0] + ':' + t.data.mins[0]
        })
    },
    bindChange(e){
        const t = this;
        const val = e.detail.value;
        const OS = t.data.I.openStartTime.split(':');
        const OE = t.data.I.openEndTime.split(':');
        if(val[0] == t.data.hours.length -1){
            t.data.mins = [];
            for (let i = 0; i <= OE[1]; i++) {
                t.data.mins.push(i < 10 ? '0' + Number(i) : i)
            }
        }else{
            t.data.mins = t.data.oMins
        }
        t.setData({
            time: t.data.hours[val[0]] + ':' + t.data.mins[val[1]],
            mins: t.data.mins
        })
    },
    onLoad(){
        const t = this;
        t.setData({
            I: app.globalData.chooseStore,
            dates: app.get_tomorrow_data()
        })
        t.setData({
            cIndex: 0,
            date: t.data.dates[0]
        })
        t.cal();
        
    },
    bindTimeChange: function bindTimeChange(e) {
        this.setData({
            time: e.detail.value
        });
    },
    ljyy(){
        const t = this;
        let _do = ()=>{
            let msg = '';
            if (!t.data.time) {
                msg = '请选择时间'
            }
            if (!t.data.date) {
                msg = '请选择日期'
            }
            if (msg) {
                wx.showModal({
                    title: '提示',
                    content: msg,
                })
                return
            }
            app.globalData.chooseStore.appointTime = t.data.date + ' ' + t.data.time + ':00'
            // here is appointment, so set pageFrom is 'appointment'
            if (app.globalData.appointFromProject) {
                // choose form project, no need choose projects again
                wx.redirectTo({
                    url: 'chooseProjectJishi',
                })
            } else {
                // choose form store, choose projects 
                wx.redirectTo({
                    url: 'projectsList?pageFrom=appointment',
                })
            }
        }
        _do();
        
    }
});