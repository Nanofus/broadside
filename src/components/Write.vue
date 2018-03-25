<template>
  <div>
    <div class="main-content">
      <h2 v-if="editing" id="post-title">{{ post.Header }}</h2>
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
      post: {},
      editing: false
    }
  },
  props: {
    id: String
  },
  methods: {
    loadPostList() {
      if (this.$route.params.id !== "new") {
        editing = true;
        request.get("/posts/" + this.$route.params.id).then(response => {
          this.post = response.data;
          let timestamp = new Date(this.post.CreatedTimestamp);
          this.post.CreatedTimestamp = timestamp.getDate() + "." + timestamp.getMonth() + "." + timestamp.getFullYear() + " " + timestamp.getHours() + ":" + timestamp.getMinutes()
        });
      } else {
        this.$route.params.id = "new";
        editing = false;
      }
    },
    submit() {
      request.post("/write/" + this.$route.params.id, this.post).then(response => {
        if (response.message != false) {
          if (editing) {
            this.$parent.successToast("Kirjoitusta muokattu onnistuneesti.");
          } else {
            this.$parent.successToast("Kirjoitus luotu onnistuneesti.");
          }
        } else {
          this.$parent.errorToast("Something went wrong when saving the post.");
        }
      });
    }
  },
  created() {
    this.loadPostList();
  }
}
</script>
