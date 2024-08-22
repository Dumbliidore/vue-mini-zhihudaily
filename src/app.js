import { createApp, ref } from '@vue-mini/core';
import { BASE_URL, getFavoriteNews } from '@/utils/request';

createApp(() => {
    const dailyNews = ref([]);

    // 定义用户信息
    const user = ref({});

    // 用户登录状态
    const loginStatus = ref(false);

    // 收藏
    const favoriteNews = ref([]);

    // 跳转文章页
    const goToDetail = (e) => {
        const newsID = e.currentTarget.dataset.id;
        wx.navigateTo({ url: `/pages/details/index?newsID=${newsID}` });
    };

    let token = wx.getStorageSync('token');
    if (token) {
        wx.request({
            url: `${BASE_URL}/auth`,
            method: 'GET',
            header: {
                Authorization: `Bearer ${token}`,
            },
            success: (res) => {
                if (res.statusCode == 200) {
                    // 验证wx session 是否过期
                    wx.checkSession({
                        success() {
                            user.value = res.data;
                            loginStatus.value = true;
                            getFavoriteNews();
                        },
                        fail() {
                            wx.login({
                                success(res) {
                                    user.value = res.data;
                                    loginStatus.value = true;
                                },
                                fail(err) {
                                    console.error('微信登录失败:', err);
                                },
                            });
                        },
                    });
                } else {
                    console.error('验证请求失败: ', res.msg);
                }
            },
            fail: (err) => {
                console.error('登录认证请求失败:', err);
            },
        });
    }

    return {
        user,
        dailyNews,
        favoriteNews,
        loginStatus,
        goToDetail,
    };
});
