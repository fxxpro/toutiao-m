module.exports = {
    plugins: {
        // vue-cli已经默认配置了autoprefixer
        // autoprefixer: {
        //     browsers: ['Android >= 4.0', 'ios >=8 ']
        // },
        'postcss-pxtorem': {
            // 根据设计稿的宽度/10得出37.5
            rootValue: 37.5,
            propList: ['*'],
        },
    },
};