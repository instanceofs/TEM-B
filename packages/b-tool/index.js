let B=require('./src/seed/B.init.js');

export default {
  install(Vue) {
    Vue.prototype.B = B
  },
}
