import {
    setToken,
    getToken,
    removeToken,
    setrefreshToken,
    getrefreshToken,
    removerefreshToken,
} from '@/utils/user_token'
import {
    loginAPI
} from '@/api'

const state = {
    token: getToken(),
    refresh_token: getrefreshToken(),
}
const mutations = {
    SETTOKEN(state, token) {
        state.token = token
    },
    SETREFTOKEN(state, refresh_token) {
        state.refresh_token = refresh_token
    }
}
const actions = {
    async asyncLoginAction({
        commit
    }, value) {
        try {
            const result = await loginAPI(value)
            // console.log(result);
            const {
                token,
                refresh_token
            } = result.data.data
            commit('SETTOKEN', token)
            commit('SETREFTOKEN', refresh_token)
            setToken(token)
            setrefreshToken(refresh_token)
            return "success"
        } catch (error) {
            return Promise.reject(new Error(error))
        }

    }
}
const getters = {}





export default {
    state,
    mutations,
    actions,
    getters
}