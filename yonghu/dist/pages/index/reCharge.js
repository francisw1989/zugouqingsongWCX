'use strict';
const app = getApp();
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Page({
    data: {
        wxChecked: true,
        mList: [{ value: '200', zeng: '' }, { value: '3000', zeng: '300' }, { value: '5000', zeng: '300' }, { value: '10000', zeng: '300' }, { value: '15000', zeng: '300' }],
        mIndex: 0
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
        t.data.U.accountAll = t.data.U.savingsAccount + Number(t.data.mList[mIndex].value)
        t.setData({
            mIndex: mIndex,
            mList: t.data.mList,
            U: t.data.U
        });
    },
    onLoad(){
        const t = this;
        let U = app.globalData.userInfo;
        U.savingsAccount = U.savingsAccount || 0;
        U.accountAll = U.savingsAccount + Number(t.data.mList[t.data.mIndex].value)
        t.setData({
            U: U
        })
    },
    vipRecharge(){
        const t = this;
        let price = t.data.mList[t.data.mIndex].value
        app.vipRechargePost(price).then(()=>{
            app.wxPay()
        })
    }
});