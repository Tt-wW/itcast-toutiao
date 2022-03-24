import Vue from 'vue'

export default {
    install() {
        Vue.directive('splot', {
            inserted(el) {
                if (el.nodeName === 'INPUT' || el.nodeName === 'TEXTAREA') {
                    // 如果直接是input标签/textarea标签
                    el.focus()
                } else {
                    // 指令在van-search组件身上, 获取的是组件根标签div, 而input在标签内
                    const inp = el.querySelector('input')
                    const textArea = el.querySelector('textarea')
                    // 如果找到了
                    if (inp || textArea) {
                        inp && inp.focus()
                        textArea && textArea.focus()
                    } else {
                        // 本身也不是, 子标签里也没有
                        console.error('请把v-splot用在输入框标签上')
                    }
                }
            },
            update(el) {
                if (el.nodeName === 'INPUT' || el.nodeName === 'TEXTAREA') {
                    // 如果直接是input标签/textarea标签
                    el.focus()
                } else {
                    // 指令在van-search组件身上, 获取的是组件根标签div, 而input在标签内
                    const inp = el.querySelector('input')
                    const textArea = el.querySelector('textarea')
                    // 如果找到了
                    if (inp || textArea) {
                        inp && inp.focus()
                        textArea && textArea.focus()
                    } else {
                        // 本身也不是, 子标签里也没有
                        console.error('请把v-splot用在输入框标签上')
                    }
                }
            }
        })
    }
}