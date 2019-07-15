import luoHeader from './header'
import luoTab from './tabnav'

const components = [
  luoHeader,
  luoTab,
]

const install = function (Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
  if (opts) {
    return false
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  install(Vue)
}

export default {
  install,
  luoHeader,
  luoTab,
}
