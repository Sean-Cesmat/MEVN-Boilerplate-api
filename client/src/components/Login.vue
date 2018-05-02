<template>
  <div>
    <h2>Login</h2>
    <form v-on:submit.prevent="handleSubmit">
      <input type='text' v-model="email" placeholder="Email" /><br />
      <input type='password' v-model="password" placeholder="Password" /><br />
      <input type="submit" value="login" class="purple-btn button" />
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    handleSubmit () {
      this.$store.dispatch('login', [this.email, this.password])
    }
  }

}
</script>
<style>
</style>
