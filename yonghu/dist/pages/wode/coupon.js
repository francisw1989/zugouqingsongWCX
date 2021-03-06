'use strict';
const app = getApp();
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Page({
    data: {
      colors: ['#459E8C', '#FF7D55', '#FEB974',  '#FEB974']
    },
    goto(e){
        const t = this;
        if(t.data.pageFrom == 'pay'){
            if (t.data.list[e.currentTarget.dataset.index].canUse==0){
                return
            }
            app.globalData.chooseCoupon = t.data.list[e.currentTarget.dataset.index]
            wx.navigateBack({
                
            })
        }else{
            
        }
    },
    getList(){
        const t = this;
      console.log(t.data.pageFrom);
        if (t.data.pageFrom =='pay'){
            app.optimalCoupon().then((res) => {
                t.setData({
                    list: res
                })
            });
        } else if (t.data.pageFrom=='wode'){
            app.userCoupon().then((res)=>{
                t.setData({
                    list: res
                })
            })
        }
    },
    onLoad(opt){
        const t = this;
        t.setData({
            pageFrom: opt.pageFrom
        })
        t.getList();
    }
});