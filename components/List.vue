<template>
  <div>
    <h3>Postaukset ({{ postList.length }})</h3>
    <div id="post-list">
      <ul>
        <li v-for="post in postList">
          <a :href="'post/' + post.Id">{{ post.Header }}</a>
        </li>
      </ul>
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
      postList: []
    }
  },
  methods: {
    loadPostList() {
      request.get("/posts/list").then(response => {
        this.postList = response.data;
        this.postList.sort(function(a,b){
          return new Date(b.CreatedTimestamp) - new Date(a.CreatedTimestamp);
        });
      });
    }
  },
  created() {
    this.loadPostList();
  }
}
</script>
