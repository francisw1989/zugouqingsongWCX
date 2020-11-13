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
        oMins: []
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
        for (let i = 0; i < 24; i++) {
            let h = i < 10 ? '0' + i : i
            t.data.hours.push(h)
        }
        for (let i = 0; i < 60; i++) {
            t.data.mins.push(i < 10 ? '0' + i : i)
        }
        t.setData({
            hours: t.data.hours,
            mins: t.data.mins,
            time: t.data.hours[0] + ':' + t.data.mins[0]
        })
    },
    bindChange(e){
        const t = this;
        const val = e.detail.value;
        t.setData({
            time: t.data.hours[val[0]] + ':' + t.data.mins[val[1]]
        })
    },
    onLoad(){
        const t = this;
        let oMins = []
        for (let i = 0; i < 60; i++){
            oMins.push(i < 10 ? '0' + i : i)
        }
        t.setData({
            I: app.globalData.chooseStore,
            dates: app.get_tomorrow_data(),
            oMins: oMins
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