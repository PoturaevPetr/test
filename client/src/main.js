import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import  BAlert  from 'bootstrap-vue'

const app = createApp(App)

app.component("b-alert", BAlert)
app.mount('#app')

