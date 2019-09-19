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
        dates: []
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
        let min = Number(t.data.I.openStartTime.split(':')[0]);
        let max = Number(t.data.I.openEndTime.split(':')[0]);
        for (let i = min; i < max+1; i++) {
            let h = i<10?'0'+i:i
            t.data.hours.push(h)
        }
        t.data.mins = ['00' ,'10', '20', '30', '40' , '50']
        t.setData({
            hours: t.data.hours,
            mins: t.data.mins
        })
    },
    bindChange(e){
        const t = this;
        const val = e.detail.value
        t.setData({
            time: t.data.hours[val[0]] + ':' + t.data.mins[val[1]]
        })
    },
    onLoad(){
        const t = this;
        t.setData({
            I: app.globalData.chooseStore,
            dates: app.get_tomorrow_data()
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
        let msg = '';
        if (!t.data.time) {
            msg = '请选择时间'
        }
        if(!t.data.date){
            msg = '请选择日期'
        }
        if(msg){
            wx.showModal({
                title: '提示',
                content: msg,
            })
            return
        }
        app.globalData.chooseStore.appointTime = t.data.date + ' ' + t.data.time + ':00'
        // here is appointment, so set pageFrom is 'appointment'
        if (app.globalData.appointFromProject){
            wx.redirectTo({
                url: 'chooseProjectJishi',
            })
        }else{
            wx.redirectTo({
                url: 'projectsList?pageFrom=appointment',
            })
        }
        
    }
});