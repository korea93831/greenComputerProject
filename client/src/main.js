import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {createBootstrap}from 'bootstrap-vue-next'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

createApp(App).use(store)
.use(createBootstrap({components: true, directives: true}))
.use(router).mount('#app')