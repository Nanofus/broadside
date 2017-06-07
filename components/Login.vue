<template>
  <div>
    <h3>Login</h3>
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
      console.log(this.username, this.password, this.rememberMe);
      request.post("/login", {
        username: this.username,
        password: this.password,
        remember: this.remember
      }).then(response => {
        if (response.result !== false) {
          this.$parent.store.userData = response.data;
          console.log(response, this.$parent.store.userData);
          this.$router.replace(this.$route.query.redirect || '/');
        }
      }).catch(function (error) {
        if (error.response) {
          console.log(error.response.headers);
        }
      });
    }
  }
}
</script>
