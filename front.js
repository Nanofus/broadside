import Vue from 'vue'
import axios from 'axios'

var request = axios.create({
  baseURL: '/api',
  timeout: 1000
});

var app = new Vue({
  el: '#app',
  data: {
    postList: []
  },
  methods: {
    loadPostList: () => {
      request.get("/posts/list").then(response => { app.postList = response.data });
    }
  }
});

app.loadPostList();
