<template>
  <div id="app">
    <header>
      <nav>
        <div>
          <router-link :to="{ name: 'Home' }" class="logo-link">
            <h3>Logo</h3>
          </router-link>
        </div>
        <Logged />
      </nav>
    </header>

    <main>
      <router-view/>
    </main>

    <footer>
      <Footer />
    </footer>
  </div>
</template>

<script>
import Logged from './components/Logged.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    'Logged': Logged,
    'Footer': Footer
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
