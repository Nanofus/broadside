<template>
  <div>
    <header>
      <div id="header-image"></div>
      <ul id="main-menu">
        <li><router-link to="/">Etusivu</router-link></li>
        <li v-if="!loggedIn()"><router-link to="/login">Kirjaudu sisään</router-link></li>
        <li v-if="!loggedIn()"><router-link to="/signup">Rekisteröidy</router-link></li>
        <li v-if="loggedIn()"><router-link to="/write/new">Kirjoita uusi osa</router-link></li>
        <li v-if="loggedIn()"><a href="#" v-on:click="logout()">Kirjaudu ulos</a></li>
        <div id="user-info" v-if="loggedIn()">Hei, {{ store.userData.Username }}</div>
      </ul>
    </header>
    <main>
      <router-view class="view"></router-view>
    </main>
    <footer>
      Powered by <a href="https://github.com/nanofus/broadside">Broadside</a>
    </footer>
    <div class="toast" id="info-toast"></div>
    <div class="toast" id="success-toast"></div>
    <div class="toast" id="error-toast"></div>
  </div>
</template>

<script>

import axios from 'axios'
var request = axios.create({
  baseURL: '',
  timeout: 1000
});
var apiRequest = axios.create({
  baseURL: '/api',
  timeout: 1000
});


var store = {
  debug: true,
  userData: {
    Username: '',
    Role: 0
  }
}

export default {
  data() {
    return {
      translations: {},
      config: {},
      store: store
    }
  },
  props: {
    id: Number
  },
  methods: {
    loadConfig() {
      request.get("/config.json")
        .then(response => {
          this.config = response.data;
        });
    },
    loadLoggedInUser() {
      apiRequest.get("/user-data")
        .then(response => {
          if (response.data !== '') {
            this.store.userData = response.data;
          }
        });
    },
    logout() {
      apiRequest.get("/logout")
        .then(response => {
          this.store.userData.Username = '';
          this.store.userData.Role = 0;
          this.$router.replace(this.$route.query.redirect || '/');
          this.successToast("Logout successful.")
        });
    },
    loggedIn() {
      if (this.store.userData.Username !== '') {
        return true;
      }
      return false;
    },
    infoToast(text) {
      var x = document.getElementById("info-toast")
      x.innerHTML = text;
      x.classList.add("show");
      setTimeout(()=>{ x.classList.remove("show"); }, 2000);
    },
    successToast(text) {
      var x = document.getElementById("success-toast")
      x.innerHTML = text;
      x.classList.add("show");
      setTimeout(()=>{ x.classList.remove("show"); }, 2000);
    },
    errorToast(text) {
      var x = document.getElementById("error-toast")
      x.innerHTML = text;
      x.classList.add("show");
      setTimeout(()=>{ x.classList.remove("show"); }, 2000);
    }
  },
  created() {
    this.loadConfig();
    this.loadLoggedInUser();
  }
}
</script>
