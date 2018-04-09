<template>
  <div class="container">
    <h1>Please login to see the secret content</h1>
    <form v-if="!$store.state.authUser" @submit.prevent="login">
      <p><i>To login, use <b>demo</b> as username and <b>demo</b> as password.</i></p>
      <p>Username: <input type="text" v-model="formUsername" name="username" /></p>
      <p>Password: <input type="password" v-model="formPassword" name="password" /></p>
      <button type="submit">Login</button>
    </form>
    <div v-else>
      Hello {{ $store.state.authUser.username }}!
      <button @click="logout">Logout</button>
    </div>
    <p><nuxt-link to="/write/new">Write a new post</nuxt-link></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formError: null,
      formUsername: '',
      formPassword: ''
    }
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch('login', {
          username: this.formUsername,
          password: this.formPassword
        })
        this.formUsername = ''
        this.formPassword = ''
        this.$toast.success('Login successful')
      } catch (e) {
        this.$toast.error('Login failed: ' + e.message);
      }
    },
    async logout() {
      try {
        await this.$store.dispatch('logout')
        this.$toast.success('Logout successful')
      } catch (e) {
        this.$toast.error('Logout failed: ' + e.message);
      }
    }
  }
}
</script>

<style lang="scss">

</style>
