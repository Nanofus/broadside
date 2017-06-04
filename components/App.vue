<template>
  <div>
    <header>
      <ul>
        <li><router-link to="/">Etusivu</router-link></li>
        <li><router-link to="/login">Kirjaudu sisään</router-link></li>
        <li><router-link to="/signup">Rekisteröidy</router-link></li>
      </ul>
    </header>
    <main>
      <router-view class="view"></router-view>
    </main>
    <footer>
      Powered by <a href="https://github.com/nanofus/broadside">Broadside</a>
    </footer>
  </div>
</template>

<script>

import axios from 'axios'
var request = axios.create({
  baseURL: '',
  timeout: 1000
});

export default {
  data() {
    return {
      translations: {},
      config: {}
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
    }
  },
  created() {
    this.loadConfig();
  }
}
</script>
