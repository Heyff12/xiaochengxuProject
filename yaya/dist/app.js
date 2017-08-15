'use strict';

App({
    onLaunch: function onLaunch() {},

    getUserInfo: function getUserInfo(cb) {
        var that = this;
        var infos = wx.getStorageSync('userInfo') || [1];
        if (!infos.length) {
            return false;
        }
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo);
        } else {
            wx.getUserInfo({
                withCredentials: false,
                success: function success(res) {
                    that.globalData.userInfo = res.userInfo;
                    wx.setStorageSync('userInfo', res.userInfo);
                    typeof cb == "function" && cb(that.globalData.userInfo);
                }
            });
        }
    },

    globalData: {
        userInfo: null
    }
});