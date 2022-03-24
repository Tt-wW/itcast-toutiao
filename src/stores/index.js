import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)




import user from './user'
import chat from './chat'




export default new Vuex.Store({
    modules:{
        user,
        chat
    }
})