import { defineComponent, ref } from '@vue-mini/core';
import { BASE_URL } from '@/utils/request';

defineComponent(() => {
    const app = getApp();

    const { favoriteNews, goToDetail } = app;

    // 清空收藏
    const clear = () => {
        const token = wx.getStorageSync('token');

        wx.request({
            url: `${BASE_URL}/favoriteNews/clear`,
            method: 'POST',
            header: {
                Authorization: `Bearer ${token}`,
            },
            success(res) {
                if (res.statusCode === 200) {
                    wx.showToast({
                        title: '清空收藏成功',
                        icon: 'success',
                        duration: 500,
                    });

                    favoriteNews.value = [];
                } else {
                    console.log(res.msg);
                }
            },
            fail(err) {
                console.log(err);
            },
        });
    };

    return {
        favoriteNews,
        clear,
        goToDetail,
    };
});
