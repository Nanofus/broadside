<template>
  <div class="main-content">
    <h2 id="post-title">{{ post.Header }}</h2>
    <ul id="poster-list">
      <li v-for="user in post.Users">{{ user }}</li>
    </ul>
    <div id="post-date"><span class="dim-text">{{ post.CreatedTimestamp }}</span></div>
    <article id="post-content" v-html="post.Text"></article>
  </div>
</template>

<script>
export default {
  async asyncData (context) {
    console.log(context)
    let response = await context.app.$axios.get("/api/posts/" + context.params.id);
    let post = response.data;
    let timestamp = new Date(post.CreatedTimestamp);
    post.CreatedTimestamp = timestamp.getDate() + "." + timestamp.getMonth() + "." + timestamp.getFullYear() + " " + timestamp.getHours() + ":" + timestamp.getMinutes()
    return { post: post }
  }
}
</script>
