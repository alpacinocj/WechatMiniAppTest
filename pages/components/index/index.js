Page({
    data: {
        list: [
            {
                id: 'layout',
                title: '布局',
                sections: [
                    {
                        desc: 'flex页面布局',
                        page: 'flex'
                    }
                ]
            },
            {
                id: 'view',
                title: '视图容器',
                sections: [
                    {
                        desc: '滑块视图容器',
                        page: 'swiper'
                    }
                ]
            },
            {
                id: 'navigate',
                title: '导航',
                sections: [
                    {
                        desc: 'wx.navigateTo(保留当前页, 跳转到其他页, 可以返回)',
                        page: 'navigate_to'
                    },
                    {
                        desc: 'wx.redirectTo(关闭当前页, 跳转到其他页, 不能返回)',
                        page: 'redirect_to',
                        open_type: 'redirect'
                    }
                ]
            },
            {
                id: 'media',
                title: '媒体',
                sections: [
                    {
                        desc: '图片',
                        page: 'image'
                    },
                    {
                        desc: '音频',
                        page: 'audio'
                    },
                    {
                        desc: '视频',
                        page: 'video'
                    }
                ]
            },
            {
                id: 'form',
                title: '表单',
                sections: [
                    {
                        desc: '用户注册',
                        page: 'signup'
                    },
                    {
                        desc: '用户登录',
                        page: 'signin'
                    },
                    {
                        desc: '滑动选择器',
                        page: 'slider'
                    },
                    {
                        desc: '进度条',
                        page: 'progress'
                    },
                    {
                        desc: '滚动选择器',
                        page: 'picker'
                    },
                    {
                        desc: '页面嵌入滚动选择器',
                        page: 'picker_view'
                    },
                    {
                        desc: '多行文本框',
                        page: 'textarea'
                    },
                    {
                        desc: '多选按钮',
                        page: 'checkbox'
                    },
                    {
                        desc: '地址选择',
                        page: 'choose_address'
                    }
                ]
            },
            {
                id: 'map',
                title: '地图',
                sections: [
                    {
                        desc: '地图示例',
                        page: 'map'
                    }
                ]
            }
        ]
    }
});