'use strict';

var helloData = {
    name: 'WeChat'
};
var order = ['red', 'yellow', 'blue', 'green', 'red'];

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
        objectArray: [{ id: 5, unique: 'unique_5' }, { id: 4, unique: 'unique_4' }, { id: 3, unique: 'unique_3' }, { id: 2, unique: 'unique_2' }, { id: 1, unique: 'unique_1' }, { id: 0, unique: 'unique_0' }],
        numberArray: [1, 2, 3, 4],
        toView: 'red',
        scrollTop: 100,
        imgUrls: ['http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg', 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'],
        indicatorDots: false,
        autoplay: false,
        interval: 5000,
        duration: 1000
    },
    changeName: function changeName(e) {
        this.setData({
            name: 'MINA'
        });
    },
    changeText: function changeText() {
        this.setData({
            text: 'changed data'
        });
    },
    changeNum: function changeNum() {
        this.data.num = 1;
        this.setData({
            num: this.data.num
        });
    },
    changeItemInArray: function changeItemInArray() {
        this.setData({
            'array[0].text': 'changed data'
        });
    },
    changeItemInObject: function changeItemInObject() {
        this.setData({
            'object.text': 'changed data'
        });
    },
    addNewField: function addNewField() {
        this.setData({
            'newField.text': 'new data'
        });
    },
    switch: function _switch(e) {
        var length = this.data.objectArray.length;
        for (var i = 0; i < length; ++i) {
            var x = Math.floor(Math.random() * length);
            var y = Math.floor(Math.random() * length);
            var temp = this.data.objectArray[x];
            this.data.objectArray[x] = this.data.objectArray[y];
            this.data.objectArray[y] = temp;
        }
        this.setData({
            objectArray: this.data.objectArray
        });
    },
    addToFront: function addToFront(e) {
        var length = this.data.objectArray.length;
        this.data.objectArray = [{ id: length, unique: 'unique_' + length }].concat(this.data.objectArray);
        this.setData({
            objectArray: this.data.objectArray
        });
    },
    addNumberToFront: function addNumberToFront(e) {
        this.data.numberArray = [this.data.numberArray.length + 1].concat(this.data.numberArray);
        this.setData({
            numberArray: this.data.numberArray
        });
    },
    upper: function upper(e) {
        console.log(e);
    },
    lower: function lower(e) {
        console.log(e);
    },
    scroll: function scroll(e) {
        console.log(e);
    },
    tap: function tap(e) {
        for (var i = 0; i < order.length; ++i) {
            if (order[i] === this.data.toView) {
                this.setData({
                    toView: order[i + 1]
                });
                break;
            }
        }
    },
    tapMove: function tapMove(e) {
        this.setData({
            scrollTop: this.data.scrollTop + 10
        });
    },
    changeIndicatorDots: function changeIndicatorDots(e) {
        this.setData({
            indicatorDots: !this.data.indicatorDots
        });
    },
    changeAutoplay: function changeAutoplay(e) {
        this.setData({
            autoplay: !this.data.autoplay
        });
    },
    intervalChange: function intervalChange(e) {
        this.setData({
            interval: e.detail.value
        });
    },
    durationChange: function durationChange(e) {
        this.setData({
            duration: e.detail.value
        });
    }
});