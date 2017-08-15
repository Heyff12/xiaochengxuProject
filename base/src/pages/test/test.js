// This is our App Service.
// This is our data.
var helloData = {
    name: 'WeChat'
}
var order = ['red', 'yellow', 'blue', 'green', 'red']

// Register a Page.
Page({
    data: {
        text: 'init data',
        num: 0,
        array: [{ text: 'init data' }],
        object: {
            text: 'init data'
        },
        name: 'WeChat',
        staffA: { firstName: 'Hulk', lastName: 'Hu' },
        staffB: { firstName: 'Shang', lastName: 'You' },
        staffC: { firstName: 'Gideon', lastName: 'Lin' },
        objectArray: [
            { id: 5, unique: 'unique_5' },
            { id: 4, unique: 'unique_4' },
            { id: 3, unique: 'unique_3' },
            { id: 2, unique: 'unique_2' },
            { id: 1, unique: 'unique_1' },
            { id: 0, unique: 'unique_0' },
        ],
        numberArray: [1, 2, 3, 4],
        toView: 'red',
        scrollTop: 100,
        imgUrls: [
            'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
        ],
        indicatorDots: false,
        autoplay: false,
        interval: 5000,
        duration: 1000
    },
    changeName: function(e) {
        // sent data change to view
        this.setData({
            name: 'MINA'
        })
    },
    changeText: function() {
        // this.data.text = 'changed data'  // bad, it can not work
        this.setData({
            text: 'changed data'
        })
    },
    changeNum: function() {
        this.data.num = 1
        this.setData({
            num: this.data.num
        })
    },
    changeItemInArray: function() {
        // you can use this way to modify a danamic data path
        this.setData({
            'array[0].text': 'changed data'
        })
    },
    changeItemInObject: function() {
        this.setData({
            'object.text': 'changed data'
        });
    },
    addNewField: function() {
        this.setData({
            'newField.text': 'new data'
        })
    },
    switch: function(e) {
        const length = this.data.objectArray.length
        for (let i = 0; i < length; ++i) {
            const x = Math.floor(Math.random() * length)
            const y = Math.floor(Math.random() * length)
            const temp = this.data.objectArray[x]
            this.data.objectArray[x] = this.data.objectArray[y]
            this.data.objectArray[y] = temp
        }
        this.setData({
            objectArray: this.data.objectArray
        })
    },
    addToFront: function(e) {
        const length = this.data.objectArray.length
        this.data.objectArray = [{ id: length, unique: 'unique_' + length }].concat(this.data.objectArray)
        this.setData({
            objectArray: this.data.objectArray
        })
    },
    addNumberToFront: function(e) {
        this.data.numberArray = [this.data.numberArray.length + 1].concat(this.data.numberArray)
        this.setData({
            numberArray: this.data.numberArray
        })
    },
    upper: function(e) {
        console.log(e)
    },
    lower: function(e) {
        console.log(e)
    },
    scroll: function(e) {
        console.log(e)
    },
    tap: function(e) {
        for (var i = 0; i < order.length; ++i) {
            if (order[i] === this.data.toView) {
                this.setData({
                    toView: order[i + 1]
                })
                break
            }
        }
    },
    tapMove: function(e) {
        this.setData({
            scrollTop: this.data.scrollTop + 10
        })
    },
    changeIndicatorDots: function(e) {
        this.setData({
            indicatorDots: !this.data.indicatorDots
        })
    },
    changeAutoplay: function(e) {
        this.setData({
            autoplay: !this.data.autoplay
        })
    },
    intervalChange: function(e) {
        this.setData({
            interval: e.detail.value
        })
    },
    durationChange: function(e) {
        this.setData({
            duration: e.detail.value
        })
    }
})
