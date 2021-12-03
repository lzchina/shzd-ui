import MysteryBoxes from './components/MysteryBoxes/index.js'

const components = [
  MysteryBoxes
]

const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  MysteryBoxes
}
