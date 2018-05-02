<template>
  <div>
    <h2>SignUp!</h2>
    <form v-on:submit.prevent="handleSubmit">
      <input type='text' v-model="name" placeholder="Name" /><br />
      <input type='text' v-model="email" placeholder="Email" /><br />
      <input type='password' v-model="password" placeholder="Password" /><br />
      <input type="submit" value="SignUp" class="purple-btn button" />
    </form>
  </div>
</template>

<script>

export default {
  name: 'SignUp',
  data () {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    handleSubmit () {
      this.$store.dispatch('signup', {name: this.signup.name, email: this.signup.email, password: this.signup.password})
    }

  }
}
</script>
<style>
</style>
