import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import store from './store'


const app = createApp(App).use(store)
app.mount('#app')

