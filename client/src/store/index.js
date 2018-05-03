import Vue from 'vue'
import Vuex from 'vuex'
import Api from '@/services/Api'
import router from '@/router'
// import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    jwt: localStorage.getItem('token'),
    user: localStorage.getItem('user')
  },
  actions: {
    signup (context, signupCreds) {
      Api().post('/auth/signup', {
        name: signupCreds.name,
        email: signupCreds.email,
        password: signupCreds.password
      }).then(result => {
        this.dispatch('primaryToast', 'You Are Now Signed Up!')
        localStorage.setItem('token', result.data.token)
        localStorage.setItem('user', JSON.stringify(result.data.user))
        this.state.jwt = result.data.token
        this.state.user = result.data.user
      }).catch(err => {
        this.dispatch('errorToast', 'Oops something went wrong')
        console.log(err.response)
      })
    },
    login (context, loginCreds) {
      Api().post('/auth/login', {
        email: loginCreds[0],
        password: loginCreds[1]
      }).then(result => {
        this.dispatch('primaryToast', 'Logged In')
        router.push({ name: 'Posts' })
        localStorage.setItem('token', result.data.token)
        localStorage.setItem('user', JSON.stringify(result.data.user))
        this.state.jwt = result.data.token
        this.state.user = result.data.user
      }).catch(err => {
        this.dispatch('errorToast', 'Oops something went wrong')
        console.log(err.response)
      })
    },
    logout (context, noToast) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.state.jwt = null
      this.state.user = null
      router.push({ name: 'Home' })
      if (!noToast) {
        this.dispatch('primaryToast', 'Logged Out')
      }
    },
    primaryToast (context, message) {
      Vue.toasted.show(message, {
        theme: 'primary',
        position: 'top-right',
        duration: 3000
      })
    },
    errorToast (context, message) {
      Vue.toasted.error(message, {
        theme: 'primary',
        position: 'top-right',
        duration: 3000
      })
    }
  },
  mutations: {

  },
  getters: {

  }
})
export default store
