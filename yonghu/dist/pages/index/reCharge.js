'use strict';
const app = getApp();
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Page({
    data: {
        wxChecked: true,
        mList: [],
        mIndex: 0,
        price: ''
    },
    priceInput(e){
        const t = this;
        t.setData({
            price: e.detail.value
        })
    },
    tagClick: function tagClick(e) {
        var t = this;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = t.data.mList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var v = _step.value;

                v.active = '';
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
        let mIndex = e.currentTarget.dataset.index;
        t.data.mList[e.currentTarget.dataset.index].active = 'active';
        t.data.U.accountAll = t.data.U.savingsAccount + Number(t.data.mList[mIndex].amount)
        t.setData({
            mIndex: mIndex,
            mList: t.data.mList,
            U: t.data.U,
            price: t.data.mList[mIndex].amount / 100
        });
    },
    vipRecharge(){
        const t = this;
        app.vipRecharge().then((res)=>{
            t.setData({
                mList: res
            })
            let U = app.globalData.userInfo;
            U.savingsAccount = U.savingsAccount || 0;
            U.accountAll = U.savingsAccount + Number(t.data.mList[t.data.mIndex].amount)
            t.setData({
                U: U,
                price: t.data.mList[t.data.mIndex].amount / 100
            })
        })
    },
    onShow(){
        const t = this;
        
        t.vipRecharge()
        
        
    },
    vipRechargePost(){
        const t = this;
        let price = t.data.price;
        app.vipRechargePost(price*100).then(()=>{
            app.wxPay().then(()=>{
                wx.navigateBack({
                    
                })
            })
        })
    }
});