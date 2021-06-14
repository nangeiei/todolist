import { createApp } from 'vue'
import App from './App.vue'
import router  from './router'
import 'es6-promise/auto'
import store from './store'

// createApp(App).use(router).use(vuex).mount('#app')
const app = createApp(App)

app.use(router).use(store)

app.mount('#app')
