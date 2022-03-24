module.exports = {
    plugins: {
        'postcss-pxtorem': {
            // 能够把所有元素的px单位转成Rem
            // rootValue: 转换px的基准值。
            // 编码时, 一个元素宽是75px，则换成rem之后就是2rem
            rootValue: 37.5,
            propList: ['*']
        }
    }
}