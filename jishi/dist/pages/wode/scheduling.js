'use strict';
const app = getApp();
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    NAV_HEIGHT: wx.STATUS_BAR_HEIGHT + wx.DEFAULT_HEADER_HEIGHT + 'px',
    datePage: '',
    date: '',
    dateobj: {},
    dateyear: null,
    datemonth: null,
    dateday: null,
    monthrange: [],
    contentHeight: wx.DEFAULT_CONTENT_HEIGHT,
    workingdays:[]
    // workingdays: [{ yes: 'true' }, { yes: 'true' }, { yes: 'true' }, { yes: 'true' }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
  },
  // 选择日期
  selectedHandler: function selectedHandler(val) {
    var e = val.detail;
    this.init(e);
  },

  // 滑动时变化
  monthChangeHandler: function monthChangeHandler(val) {
    var e = val.detail;
    this.changeDate(e);
  },
  bindselectedstart: function bindselectedstart(val) {
    var e = val.detail;
  },
  bindselectedend: function bindselectedend(val) {
    var e = val.detail;
    console.log(e);
  },
  nextchange: function nextchange() {
    // 结束时间范围的时间戳
    var endrange = Date.parse(new Date(this.data.monthrange[1]));

    var arr = this.data.monthrange[1].split('/');
    endrange = new Date(arr[0], arr[1] - 1);
    endrange = Date.parse(endrange);
    var date = new Date(this.data.dateobj.arr[0], this.data.dateobj.arr[1] - 1);
    date.setMonth(date.getMonth() + 1);
    // 改变后的日期时间戳
    date = Date.parse(date);

    if (date > endrange) {
      return false;
    } else {
      this.data.dateobj.date = this.format(date);
      this.changeDate(this.data.dateobj.date);
      this.data.datePage = this.data.dateobj.arr[0] + '/' + this.data.dateobj.arr[1];
      this.setData({
        datePage: this.data.datePage
      });
    }
  },
  prevchange: function prevchange() {
    // let date = new Date(this.dateobj.date)
    // 开始时间范围的时间戳
    var startrange = Date.parse(new Date(this.data.monthrange[0]));
    // let startrange
    var arr = this.data.monthrange[0].split('/');
    startrange = new Date(arr[0], arr[1] - 1);
    startrange = Date.parse(startrange);
    var date = new Date(this.data.dateobj.arr[0], this.data.dateobj.arr[1] - 1);
    date.setMonth(date.getMonth() - 1);
    // 改变后的日期时间戳
    date = Date.parse(date);
    if (date < startrange) {
      return false;
    } else {
      this.data.dateobj.date = this.format(date);
      this.changeDate(this.data.dateobj.date);
      this.data.datePage = this.data.dateobj.arr[0] + '/' + this.data.dateobj.arr[1];
      this.setData({
        datePage: this.data.datePage
      });
    }
  },
  format: function format(obj) {
    var date = new Date(obj);
    var y = 1900 + date.getYear();
    var m = '0' + (date.getMonth() + 1);
    var d = '0' + date.getDate();
    return y + '/' + m.substring(m.length - 2, m.length) + '/' + d.substring(d.length - 2, d.length);
  },

  // 根据参数，改变dateobj。dateobj用来临时存储改变的时间。并且生成数组。
  init: function init(date) {
    const t = this;
    this.data.dateobj.date = date;
    this.data.dateobj.arr = date.split('/');
    this.setData({
      date: this.data.dateobj.date,
      dateobj: this.data.dateobj,
      dateyear: this.data.dateobj.arr[0],
      datemonth: this.data.dateobj.arr[1],
      dateday: this.data.dateobj.arr[2]
    });
  },
  changeDate: function changeDate(date) {
    const t = this;
    this.data.dateobj.date = date;
    this.data.dateobj.arr = date.split('/');
    this.setData({
      dateobj: this.data.dateobj,
      dateyear: this.data.dateobj.arr[0],
      datemonth: this.data.dateobj.arr[1]
    });
    t.employeeSchedule();
  },
  onLoad: function onLoad() {
    const t = this;
    var start = void 0,
        end = void 0;
    var rangedate = new Date();
    var rangedate2 = new Date();
    start = this.format(rangedate.setMonth(new Date().getMonth() - 6));
    end = this.format(rangedate2.setMonth(new Date().getMonth() + 6));
    start = start.substring(0, 7);
    end = end.substring(0, 7);
    this.data.monthrange.push(start, end);
    this.setData({
      monthrange: this.data.monthrange
    });
    var date = new Date();
    this.init(this.format(date));


    t.employeeSchedule();
  },
  employeeSchedule:function employeeSchedule(){
    const t = this;
    let params = {
      employeeId:app.globalData.userInfo.id,
      monthDate:t.data.dateyear+"-"+t.data.datemonth
    }
    app.employeeSchedule(params).then((res)=>{
      let data = res.schedules;
       let newRes = res.schedules.filter((element,index) => {
        if(element.shiftsId == 1){//早班
          element.yes = true;
          element.absent = false;
          element.night = false;
        }else if(element.shiftsId == 2){//中班
          element.yes = false;
          element.absent = true;
          element.night = false;
        }else if(element.shiftsId == 3){//晚班
          element.yes = false;
          element.absent = false;
          element.night = true;
        }
      });
      t.setData({
        workingdays: res.schedules,
        shiftsSettings:res.shiftsSettings
      });
      console.log(t.data);

    
    })
  }
});