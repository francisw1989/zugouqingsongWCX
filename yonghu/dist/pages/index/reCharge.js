'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Page({
    data: {
        wxChecked: true,
        mList: [{ value: '200', zeng: '' }, { value: '3000', zeng: '300' }, { value: '5000', zeng: '300' }, { value: '10000', zeng: '300' }, { value: '15000', zeng: '300' }]
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

        t.data.mList[e.currentTarget.dataset.index].active = 'active';
        t.setData({
            mList: t.data.mList
        });
    }
});