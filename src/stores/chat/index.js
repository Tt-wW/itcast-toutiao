import {
    setUser,
    getUser
} from '@/utils/chat/index'


const state = {
    user: JSON.parse(getUser()) || {} // 用户基本资料(默认从本地取)
}

const mutations = {
    toSetUser(state, userObj) {
        state.user = userObj
        setUser(JSON.stringify(userObj))
    }
}

const actions = {}

const getters = {}




export default {
    state,
    mutations,
    actions,
    getters
}