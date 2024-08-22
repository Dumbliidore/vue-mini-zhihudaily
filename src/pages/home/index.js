import { defineComponent, ref } from '@vue-mini/core';
import { BASE_URL } from '@/utils/request';

defineComponent(() => {
    const app = getApp();

    const { dailyNews, goToDetail } = app;
    const date = ref('');
    const slides = ref([]);

    // 获取新闻数据
    wx.request({
        url: `${BASE_URL}/daily/news`,
        method: 'GET',
        header: {
            'content-type': 'application/json', // 默认值
        },
        success: (res) => {
            if (res.statusCode == 200) {
                date.value = res.data.date;
                dailyNews.value = res.data.news;
                slides.value = dailyNews.value.slice(0, 5);
            } else {
                console.log('获取新闻数据失败');
            }
        },
        fail: (err) => {
            console.log(err);

            return;
        },
    });

    return {
        dailyNews,
        date,
        slides,
        goToDetail,
    };
});
