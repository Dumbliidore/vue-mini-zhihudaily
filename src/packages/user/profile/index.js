import { defineComponent, ref } from '@vue-mini/core';
import { BASE_URL } from '@/utils/request';
import { defaultAvatar } from '@/utils/icon';

defineComponent(() => {
    const app = getApp();

    // 定义user，不能直接使用 app.user，因为用户信息可能还没保存
    const user = ref({});
    user.value = app.user.value;

    const onChooseAvatar = (e) => {
        let avatarUrl = e.detail.avatarUrl;
        user.value.avatar =
            'data:image/png;base64,' +
            wx.getFileSystemManager().readFileSync(avatarUrl, 'base64');
    };

    const onChangeNickName = (e) => {
        user.value.name = e.detail.value;
    };

    const onChangeJob = (e) => {
        user.value.job = e.detail.value;
    };

    // 用户保存时根据 authed 判断是注册还是更新信息
    const onSave = () => {
        const loginStatus = app.loginStatus.value;
        const token = wx.getStorageSync('token');

        if (!loginStatus) {
            // 登录成功提示
            wx.showModal({
                title: '用户未登录',
                content: '是否授权登录？',
                success(res) {
                    if (res.confirm) {
                        wx.navigateTo({
                            url: 'pages/login/index',
                        });
                    } else if (res.cancel) {
                        console.log('用户点击取消');
                    }
                },
            });
        } else {
            // 更新用户信息
            wx.request({
                url: `${BASE_URL}/user/update`,
                method: 'POST',
                header: {
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    id: app.user.value.id,
                    uid: app.user.value.uid,
                    uKey: app.user.value.uKey,
                    name: user.value.name,
                    avatar: user.value.avatar,
                    job: user.value.job,
                },
                success: (res) => {
                    if (res.statusCode === 200) {
                        app.user.value = res.data.user;
                        user.value = app.user.value;

                        wx.setStorageSync('token', res.data.token);

                        // 更新成功提示
                        wx.showToast({
                            title: '用户信息已更新',
                            icon: 'success',
                            duration: 1000,
                        });
                    }
                },
                fail: (err) => {
                    console.log(err);
                },
            });
        }
    };

    return {
        defaultAvatar,
        onChooseAvatar,
        onChangeNickName,
        onSave,
        onChangeJob,
        user,
    };
});
