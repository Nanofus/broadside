<template>
  <div>
    <h3>Postaus {{ post.Header }}</h3>
    <div v-html="post.Text"></div>
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
      request.get("/posts/" + this.$route.params.id).then(response => { this.post = response.data[0] });
    }
  },
  created() {
    this.loadPostList();
  }
}
</script>
