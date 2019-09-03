'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Page({
    data: {
        list: [{ value: 60, name: '颈椎放松' }],
        tlsList: [
            { name:'张三', chosed: false },
            { name: '李四', chosed: false },
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
        show: false
    },
    chooseTlx(e){
        const t = this;
        let i = e.currentTarget.dataset.index;
        if (t.data.tlsList[i].chosed){
            t.data.tlsList[i].chosed = false;
            
        }else{
            t.data.tlsList[i].chosed = true;
            
        }
        t.data.tlsChosed = [];
        for (const v of t.data.tlsList){
            if(v.chosed){
                t.data.tlsChosed.push(v)
            }
        }
        t.setData({
            tlsList: t.data.tlsList,
            tlsChosed: t.data.tlsChosed
        })
    },
    submit: function submit() {
        var t = this;
        console.log('21');
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
            cIndex: index
        });
    },
    sliderchange: function sliderchange(e) {
        var t = this;
        var value = e.detail.value;
        t.data.list[e.currentTarget.dataset.index].value = value;
        t.setData({
            list: t.data.list
        });
    }
});