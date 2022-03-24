import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/stores/index.js'

import * as API from '@/api'


// 移动端适配
import 'amfe-flexible'




// vant
import {
  NavBar,
  Form,
  Field,
  Button,
  Tabbar,
  TabbarItem,
  Icon,
  Tab,
  Tabs,
  Cell,
  List,
  PullRefresh,
  ActionSheet,
  Popup,
  Row,
  Col,
  Badge,
  Search,
  Divider,
  CellGroup,
  Tag,
  Image,
  Dialog,
  DatetimePicker
} from 'vant'
Vue.use(NavBar)
Vue.use(Form)
Vue.use(Field)
Vue.use(Button)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Icon)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Cell)
Vue.use(List)
Vue.use(PullRefresh)
Vue.use(ActionSheet)
Vue.use(Popup)
Vue.use(Row)
Vue.use(Col)
Vue.use(Badge)
Vue.use(Search)
Vue.use(Divider)
Vue.use(CellGroup)
Vue.use(Tag)
Vue.use(Image)
Vue.use(Dialog)
Vue.use(DatetimePicker)


// 自定义指令
import myDirective from '@/utils/directive'
Vue.use(myDirective)

// 全局组件
import ArticleItem from '@/components/ArticleItem.vue'
Vue.component('ArticleItem', ArticleItem)








Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$API = API
  },
  router,
  store
}).$mount('#app')