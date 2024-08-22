import { definePage, ref, computed } from '@vue-mini/core';
import { collectNews, cancelCollectNews } from '@/utils/request';
import { icon } from '@/utils/icon';

definePage((query) => {
    const { newsID } = query;

    if (!newsID) {
        // 报错提示
        return {};
    }

    const app = getApp();
    const { dailyNews, favoriteNews } = app;

    const news = dailyNews.value.find((item) => item.id === newsID);
    const isCollected = ref(false);

    // 判断是否已经收藏
    if (favoriteNews.value.find((item) => item.id === newsID)) {
        isCollected.value = true;
    }

    const collectImgURL = computed(() => {
        return isCollected.value ? icon.redStarIcon : icon.starIcon;
    });

    const collectButtonText = computed(() => {
        return isCollected.value ? '取消收藏' : '收藏';
    });

    // 点击 收藏按钮
    const collect = () => {
        isCollected.value = !isCollected.value;

        if (isCollected.value) {
            // TODO: 请求成功后，更新 favoriteNews
            favoriteNews.value.unshift(news);
            // 发送请求，收藏该文章
            collectNews(news);
        } else {
            // TODO: 请求成功后，更新 favoriteNews
            // 发送请求，取消收藏该文章，从 favorite 中移除 newsID
            // TODO: 请求成功后再移除 newsID
            favoriteNews.value = favoriteNews.value.filter(
                (element) => element.id !== news.id,
            );
            cancelCollectNews(news);
        }
    };

    return {
        news,
        collectImgURL,
        collectButtonText,
        collect,
        wechatIcon: icon.wechatIcon,
    };
});
