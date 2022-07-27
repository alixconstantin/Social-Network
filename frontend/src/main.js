import { createApp } from 'vue'
import * as VueRouter from 'vue-router'

import App from './App.vue'
import store from './store'

 //import ElementPlus from 'element-plus'
 // import 'element-plus/lib/theme-chalk/index.css'

const HomePage = () => import('./pages/HomePage.vue')
const NewsPage = () => import('./pages/NewsPage.vue')

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes: [
    {
        path: '/',
        name: 'Home',
        component: HomePage

    },
    {
        path: '/news',
        name: 'News',
        component: NewsPage
    }
]
})


const app = createApp(App)

app.use(router)
app.use(store)
// app.use(ElementPlus)

app.mount('#app')
