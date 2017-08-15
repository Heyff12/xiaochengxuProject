'use strict';

var app = getApp();
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },

  bindViewTap: function bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    });
  },
  bindViewTest: function bindViewTest() {
    wx.navigateTo({
      url: '../test/test'
    });
  },
  onLoad: function onLoad() {
    console.log('onLoad');
    var that = this;

    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo
      });
    });
  },
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123'
    };
  }
});