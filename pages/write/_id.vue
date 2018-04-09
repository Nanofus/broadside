<template>
  <div class="main-content">
    <input id="write-title" v-model="post.Header" />
    <ul id="poster-list">
      <li v-for="user in post.Users">{{ user }}</li>
    </ul>
    <div id="post-date"><span class="dim-text">{{ post.CreatedTimestamp }}</span></div>
    <article id="post-content" v-html="post.Text" contenteditable="true"></article>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  async asyncData (context) {
    if (context.params.id != "new") {
      console.log(context)
      let response = await context.app.$axios.get("/api/posts/" + context.params.id);
      let post = response.data;
      let timestamp = new Date(post.CreatedTimestamp);
      post.CreatedTimestamp = timestamp.getDate() + "." + timestamp.getMonth() + "." + timestamp.getFullYear() + " " + timestamp.getHours() + ":" + timestamp.getMinutes()
      return { post: post }
    }
  }
}
</script>
