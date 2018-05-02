<template>
  <div id="logged">
    <div v-if="!$store.state.user">
      <button v-on:click="show('login')" class="header-button button tiny">Login</button> or
      <button v-on:click="show('signup')" class="header-button button tiny">Signup</button></div>
    <div v-if="$store.state.user">
      <router-link :to="{ name: 'Posts' }">
        <button class="header-button button tiny">Posts</button>
      </router-link>
      <button v-on:click="logout" class="header-button button tiny">Logout</button>
      <p class='username'> | {{ $store.state.user.name }}</p>
    </div>

    <modal name="login">
      <div class="main-modal">
        <form v-on:submit.prevent="onLoginSubmit('login')">
          <div class="modal-content">
            <input type="text" v-model="login['email']" placeholder="Email" />
            <input type="password" v-model="login['password']" placeholder="Password" />
          </div>
          <div class="modal-footer">
            <button type="submit" class="purple-btn button">Login</button>
          </div>
        </form>
      </div>
    </modal>
    <modal name="signup" height="auto" :scrollable="true" :adaptive="true">
      <div class="main-modal">
        <form v-on:submit.prevent="onSignupSubmit('signup')">
          <div class="modal-content">
            <input type="text" name="first-name" v-model="signup['name']" placeholder="Name"/>
            <input type="text" name="email" v-model="signup['email']" placeholder="Email" />
            <input type="password" name="password" v-model="signup['password']" placeholder="Password" />
          </div>
          <div class="modal-footer">
            <button type="submit" class="purple-btn button">Sign Up</button>
          </div>
        </form>
      </div>
    </modal>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      login: {
        'email': '',
        'password': ''
      },
      signup: {
        'name': '',
        'email': '',
        'password': ''
      }
    }
  },
  mounted () {
    if (localStorage.getItem('token')) {
      let token = localStorage.getItem('token')
      let user = localStorage.getItem('user')
      user = JSON.parse(user)
      this.$store.state.jwt = token
      this.$store.state.user = user
    } else {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.$store.dispatch('logout', true)
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
    },
    onLoginSubmit (type) {
      this.$store.dispatch('login', [this.login.email, this.login.password])
      this.$modal.hide(type)
    },
    show (type) {
      this.$modal.show(type)
    },
    onSignupSubmit () {
      this.$store.dispatch('signup', {name: this.signup.name, email: this.signup.email, password: this.signup.password})
      this.$modal.hide('signup')
    }
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
