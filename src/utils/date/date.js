import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime' // 到指定时间需要的插件
import 'dayjs/locale/zh' // 集成中文

/**
 * .....多久之前
 * @param {*} 之前的时间
 * @returns 系统时间到之前指定时间的距离值
 * 这部分看文档即可
 */
export const timeAgo = (targetTime) => {
    // 格式化时间
    dayjs.extend(relativeTime)
    dayjs.locale('zh')
    var a = dayjs()
    var b = dayjs(targetTime)
    return a.to(b) // 返回多久之前...
}


export const formatDate = (dateObj) =>{
    return dayjs(dateObj).format('YYYY-MM-DD')
}