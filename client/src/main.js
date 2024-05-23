import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { aliases, mdi} from 'vuetify/iconsets/mdi'

// axios
import axios from 'axios'

const vuetify=createVuetify({
    components,
    directives
})
createApp(App)
.use(store)
.use(router)
.use(vuetify)
.use(axios)
.mount('#app')

export default new vuetify({
    icons: {
        iconfont: 'mdi',
        sets: {
            mdi,
        },
    },
})