<template>
  <div>
    <h3>Postaukset ({{ postList.length }})</h3>
    <div id="post-list">
      <ul>
        <li v-for="post in postList">
          <nuxt-link :to="'/posts/' + post.Id">{{ post.Header }}</nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  async asyncData ({ app }) {
    let postList = await app.$axios.get("/api/posts/list");
    postList = postList.data;
    postList.sort(function(a,b){
      return new Date(b.CreatedTimestamp) - new Date(a.CreatedTimestamp);
    });
    return { postList: postList }
  }
}
</script>
