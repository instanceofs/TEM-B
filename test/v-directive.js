import Vue from "vue";

// 防止重复点击
// v-preventReClick="5000"
Vue.directive('preventReClick', {
  inserted (el, binding) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true
        setTimeout(() => {
          el.disabled = false
        },binding.value || 1000)
      }
    })
  }
})
