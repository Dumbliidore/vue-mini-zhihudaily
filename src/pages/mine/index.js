import { defineComponent } from '@vue-mini/core';
import { icon, defaultAvatar } from '@/utils/icon';

defineComponent(() => {
    const app = getApp();

    const router = (e) => {
        const { page } = e.currentTarget.dataset;

        wx.navigateTo({ url: `/packages/user/${page}/index` });
    };

    const toLogin = () => {
        wx.navigateTo({ url: '/pages/login/index' });
    };

    const onClearCache = () => {
        wx.showModal({
            title: '提示',
            content: '确定清理全部缓存吗？',
            success(res) {
                if (res.confirm) {
                    console.log('用户点击确定');
                    // wx.clearStorageSync();
                } else if (res.cancel) {
                    console.log('用户点击取消');
                }
            },
        });
    };

    return {
        router,
        toLogin,
        onClearCache,
        defaultAvatar,
        user: app.user,
        favoriteIcon: icon.favoriteIcon,
        arrowIcon: icon.arrowIcon,
        suggestionIcon: icon.suggestionIcon,
        copyrightIcon: icon.copyrightIcon,
        cleanIcon: icon.cleanIcon,
    };
});
