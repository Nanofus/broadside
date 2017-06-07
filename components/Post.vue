<template>
  <div>
    <div class="main-content">
      <h2 id="post-title">{{ post.Header }}</h2>
      <ul id="poster-list">
        <li v-for="user in post.Users">{{ user }}</li>
      </ul>
      <div id="post-date"><span class="dim-text">{{ post.CreatedTimestamp }}</span></div>
      <article id="post-content" v-html="post.Text"></article>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
var request = axios.create({
  baseURL: '/api',
  timeout: 1000
});

export default {
  data() {
    return {
      post: {}
    }
  },
  props: {
    id: Number
  },
  methods: {
    loadPostList() {
      request.get("/posts/" + this.$route.params.id).then(response => {
        this.post = response.data;
        let timestamp = new Date(this.post.CreatedTimestamp);
        this.post.CreatedTimestamp = timestamp.getDate() + "." + timestamp.getMonth() + "." + timestamp.getFullYear() + " " + timestamp.getHours() + ":" + timestamp.getMinutes()
      });
    }
  },
  created() {
    this.loadPostList();
  }
}
</script>
