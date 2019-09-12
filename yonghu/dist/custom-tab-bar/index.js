const app = getApp();
Component({
    data: {
        selected: 0,
        color: "#333",
        selectedColor: "#459E8A",
        list: app.globalData.barList
    },
    attached() {},
    methods: {
        switchTab(e) {
            const data = e.currentTarget.dataset
            const url = data.path
            wx.switchTab({
                url
            })
            this.setData({
                selected: data.index
            })
        }
    },
    onLoad(){
        console.log('32323')
    }
})