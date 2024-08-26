export const BASE_URL = 'your_api_url';

// 获取用户收藏文章的ID
export const getFavoriteNews = () => {
    const app = getApp();
    const token = wx.getStorageSync('token');
    wx.request({
        url: `${BASE_URL}/favoriteNews`,
        method: 'GET',
        header: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },

        success: (res) => {
            if (res.statusCode == 200) {
                app.favoriteNews.value = res.data.news;
            } else {
                console.log('获取用户信息失败');
            }
        },
        fail: (err) => {
            console.log(err);

            return;
        },
    });
};

// 收藏文章
export const collectNews = (news) => {
    const token = wx.getStorageSync('token');
    wx.request({
        url: `${BASE_URL}/news/collect`,
        method: 'POST',
        header: {
            Authorization: `Bearer ${token}`,
        },
        data: {
            news,
        },
        success: (res) => {
            if (res.statusCode === 200) {
                console.log('收藏成功');
                // 更新成功提示
                wx.showToast({
                    title: '收藏成功',
                    icon: 'success',
                    duration: 500,
                });
            } else {
                console.log('请求收藏失败！');
            }
        },
        fail: (err) => {
            console.log('请求收藏错误: ', err);
        },
    });
};

// 取消收藏文章
export const cancelCollectNews = (news) => {
    const token = wx.getStorageSync('token');
    wx.request({
        url: `${BASE_URL}/news/uncollect`,
        method: 'POST',
        header: {
            Authorization: `Bearer ${token}`,
        },
        data: {
            news,
        },
        success: (res) => {
            if (res.statusCode === 200) {
                console.log('取消收藏成功');
            } else {
                console.log('请求取消收藏失败！');
            }
        },
        fail: (err) => {
            console.log('请求取消收藏错误: ', err);
        },
    });
};
