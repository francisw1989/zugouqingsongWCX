'use strict';
const app = getApp();
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Page({
    data: {
        list: [{ bgCol: '#459E8C' }, { bgCol: '#FF7D55' }, { bgCol: '#FEB974' }, { bgCol: '#E6E6E6' }]
    },
    getList(){
        const t = this;
        if(t.data.pageFrom=='order'){
            app.optimalCoupon();
        }else {
            app.userCoupon()
        }
    },
    onLoad(){

    }
});