import { createStore, createLogger } from 'vuex'
import UsersModule from './modules/UsersModule'


const store = createStore({
  modules: {
    users: UsersModule,
  },
  plugins: import.meta.env.MODE !== 'production' ? [createLogger()] : []
})

export default store
