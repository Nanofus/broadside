<template>
  <div>
    <h3>Sign up</h3>
    <form>
      <div>
        <label>Username</label>
        <input type="text" v-model="username" name="username">
      </div>
      <div>
        <label>Password</label>
        <input type="password" v-model="password" name="password">
      </div>
      <div>
        <label>Remember Me</label>
        <input type="checkbox" v-model="remember" name="remember" value="yes">
      </div>

      <button type="button" v-on:click="login()">Login</button>
    </form>
  </div>
</template>

<script>

import axios from 'axios'
var request = axios.create({
  baseURL: '/api',
  timeout: 1000
});

export default {
  data () {
    return {
      username: '',
      password: '',
      remember: false
    }
  },
  methods: {
    login() {
      request.post("/signup", {
        username: this.username,
        password: this.password,
        remember: this.remember
      }).then(response => {
        this.$parent.store.userData = response.data;
        this.$parent.successToast("Signup successful.")
        this.$router.replace(this.$route.query.redirect || '/');
      }).catch(error => {
        if (error.response) {
          this.$parent.errorToast(error.response.headers['www-authenticate'])
        }
      });
    }
  }
}
</script>
