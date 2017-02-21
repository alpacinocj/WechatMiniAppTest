Page({
    data: {
        pageTitle: '',
        imgList: [
            {
                name: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
                mode: 'scaleToFill'
            },
            {
                name: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
                mode: 'aspectFit'
            },
            {
                name: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
                mode: 'scaleToFill'
            }
        ]
    },
    onLoad: function(options) {
        console.log(options);
        this.setData({
            pageTitle: options.page_title
        });
    }
});