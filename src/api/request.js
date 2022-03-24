import axios from 'axios'
import {
    removeToken,
    getToken,
    setToken
} from '@/utils/user_token'
import router from '@/router'
import {
    mapMutations
} from 'vuex'
import {
    refreshTokenAPI
} from '@/api'
import {
    Notify
} from 'vant'









let requests = axios.create({
    baseURL: 'http://toutiao.itheima.net',
    timeout: 5000
})

// 请求拦截器
requests.interceptors.request.use((config) => {
    // a6d170e5-2530-490f-8e49-f06aa4922f3f
    getToken()?getToken():setToken('')
    if (getToken().length > 0 && config.headers.Authorization === undefined) {
        // 发起请求之前, 把token携带在请求头上(表明自己身份)
        // 所有api接口里以后暂时不用自己携带Headers+Token了
        config.headers.Authorization = `Bearer ${getToken()}`
    }
    return config

}, async (error) => {
    return Promise.reject(error)
})

// 响应拦截器
requests.interceptors.response.use((res) => {
    return res
}, async (error) => { // 响应状态码4xx/5xx进这里
    // 对请求错误做些什么
    if (error.response.status === 401) { //身份过期
        // token续签
        // token续签方式1:
        // store.commit('setToken', '')
        // router.push({ path: '/login' })
        // token续签方式2: refreshToken(用户无感知)
        setToken('')
        const res = await refreshTokenAPI()
        setToken(res.data.data.token)
        // 再调用一次未完成的请求啊(用户无感知)
        // error.config 就是上一次axios请求的配置对象
        // console.dir(error.config)
        // 把新的token赋予到下一次axios请求的请求头中
        error.config.headers.Authorization = 'Bearer ' + res.data.data.token
        // return到await的地方
        return axios(error.config)
    } else {
        Notify({
            type: 'warning',
            message: '登录过期'
        })
        router.push('/login')
        return Promise.reject(error)
    }
})


export default requests