export const lightFn = (str, target) => {
    const reg = new RegExp(target, 'ig')
    // 替换字符串中的match----》match就是需要高亮的关键字
    return str.replace(reg, (match) => {
        return `<span style="color: red">${match}</span>`
    })
}