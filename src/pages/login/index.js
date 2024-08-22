import { defineComponent } from '@vue-mini/core';
import { BASE_URL, getFavoriteNews } from '@/utils/request';

defineComponent(() => {
    const app = getApp();

    const { user } = app;
    const handleLogin = (uid, uKey) => {
        wx.request({
            url: `${BASE_URL}/login`,
            method: 'POST',
            data: {
                uid,
                uKey,
            },
            success: (res) => {
                if (res.statusCode == 200) {
                    user.value = res.data.user;
                    wx.setStorageSync('token', res.data.token);
                    // 获取收藏的新闻ID
                    getFavoriteNews();
                    app.loginStatus.value = true;
                    wx.navigateBack();
                } else {
                    console.log('登录注册失败', res.errMsg);
                }
            },
            fail: (err) => {
                console.error('登录请求失败:', err);
            },
        });
    };

    const login = () => {
        wx.login({
            success(res) {
                if (res.code) {
                    wx.request({
                        url: `${BASE_URL}/wx/login?code=${res.code}`,
                        method: 'GET',
                        success: (res) => {
                            const { openid, session_key } = res.data;
                            handleLogin(openid, session_key);
                        },
                        fail: (err) => {
                            console.log(err);
                        },
                    });
                } else {
                    console.log('微信登录请求错误！' + res.errMsg);
                }
            },
            fail(err) {
                console.log('微信登录失败！' + err);
            },
        });
    };

    return {
        login,
    };
});
