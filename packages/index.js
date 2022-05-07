//import daqModuleConfig from './daq-module-config/index'
import B from './b-tool'
import Vue, { VueConstructor } from 'vue';
const components = [
    B,
]
const install = function (Vue,options) {
  components.forEach((componentName) => {
    Vue.component(componentName.name, componentName)
  })
}

export  {
  B
}
export default {
  install,
}
