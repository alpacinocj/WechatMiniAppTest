Page({
    data: {
        list: [
            {
                id: 'request',
                title: '网络请求',
                sections: [
                    {
                        desc: '发送请求到服务端',
                        page: 'request'
                    },
                    {
                        desc: '测试request请求类(Promise语法封装)',
                        page: 'request_class'
                    }
                ]
            },
            {
                id: 'files',
                title: '文件操作',
                sections: [
                    {
                        desc: '图片上传',
                        page: 'upload'
                    },
                    {
                        desc: '资源下载',
                        page: 'download'
                    }
                ]
            },
            {
                id: 'interaction',
                title: '界面交互反馈',
                sections: [
                    {
                        desc: '消息提示',
                        page: 'tooltip'
                    },
                    {
                        desc: '操作菜单',
                        page: 'action_sheet'
                    },
                    {
                        desc: '动态设置导航条',
                        page: 'navigation_bar_title'
                    }
                ]
            },
            {
                id: 'location',
                title: '位置',
                sections: [
                    {
                        desc: '获取当前地理位置, 速度',
                        page: 'get_location'
                    }
                ]
            },
            {
                id: 'equipment',
                title: '设备',
                sections: [
                    {
                        desc: '系统信息',
                        page: 'sys_info'
                    },
                    {
                        desc: '网络状态',
                        page: 'network_type'
                    },
                    {
                        desc: '重力感应器',
                        page: 'accelerometer'
                    },
                    {
                        desc: '罗盘',
                        page: 'compass'
                    },
                    {
                        desc: '拨打电话',
                        page: 'call_phone'
                    }
                ]
            }
        ]
    }
});